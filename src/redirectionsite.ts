import * as cdk from 'aws-cdk-lib';

import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfrontOrigins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface RedirectionSiteProps {
  targetUrl: string;
  customDomain?: CustomDomainProps;
}

interface CustomDomainProps {
  domainName: string;
  hostedZone: route53.IHostedZone | string;
  // TODO: Validation
}

export class RedirectionSite extends Construct {
  public readonly cfDistributionUrl: string;
  public readonly url: string;

  constructor(scope: Construct, id: string, props: RedirectionSiteProps) {
    super(scope, id);

    let hostedZone: route53.IHostedZone | undefined;

    // Looks up the Hosted Zone, if set
    if (typeof props.customDomain?.hostedZone === 'string') {
        hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
        domainName: props.customDomain?.hostedZone,
      });
    } else if (props.customDomain?.hostedZone instanceof route53.HostedZone) {
      hostedZone = props.customDomain?.hostedZone;
    }

      const functionRedirect = new cloudfront.Function(this, 'RedirectFunction', {
          code: cloudfront.FunctionCode.fromInline(`
                function handler(event) {
                    var response = {
                        statusCode: 302,
                        statusDescription: "Found",
                        headers: {
                            'location': { value: "${props.targetUrl}" },
                            'cloudfront-functions': { value: "redirect" }
                        }
                    };
                    return response;
                }
            `),
          runtime: cloudfront.FunctionRuntime.JS_2_0,
    });

      const distribution = new cloudfront.Distribution(this, 'RedirectDistribution', {
          defaultBehavior: {
              origin: new cloudfrontOrigins.S3Origin(new s3.Bucket(
                  this, 'StubBucket', { removalPolicy: cdk.RemovalPolicy.DESTROY })),
              viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
              responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS,
              functionAssociations: [{
                  function: functionRedirect,
          eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
        }],
      },
      domainNames: (hostedZone && props.customDomain) ? [props.customDomain?.domainName] : undefined,
        certificate: (hostedZone && props.customDomain) ? new acm.Certificate(this, 'RedirectCertificate', {
        domainName: props.customDomain.domainName,
        validation: acm.CertificateValidation.fromDns(hostedZone),
      }) : undefined,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
    });

    if (hostedZone) {
      new route53.RecordSet(this, 'DNSRecord', {
        zone: hostedZone,
        recordName: props.customDomain?.domainName,
        recordType: route53.RecordType.A,
        target: route53.RecordTarget.fromAlias(new route53Targets.CloudFrontTarget(distribution)),
      });
    }

    this.cfDistributionUrl = `https://${distribution.domainName}`;
    this.url = props.customDomain ? `https://${props.customDomain.domainName}` : this.cfDistributionUrl;
  }
}