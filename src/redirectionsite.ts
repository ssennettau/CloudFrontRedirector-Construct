import * as fs from 'fs';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';

import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfrontOrigins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface RedirectionSiteProps {
  /**
   * Destination URL for all redirections
   *
   * @example https://mysite.com/
   */
  readonly targetUrl: string;
  /**
   * Custom Domain for the redirector to use (Optional)
   *
   * @default - Not configured
   */
  readonly customDomain?: CustomDomainProps;
  /**
   * List of custom back-halves for specific redirections. Any non-matches will default back to the `targetUrl`.
   *
   * @default - No custom back-half redirections
   * @example - [{ path: "/author", destination: "https://ssennett.net/" }
   */
  readonly pathRedirects?: CustomPath[];
}

export interface CustomDomainProps {
  /**
   * Domain name to use for the redirector (used as the record set name)
   *
   * @example "i.redir.net"
   */
  readonly domainName: string;
  /**
   * Hosted Zone to use for the redirector (used as the record set zone)
   *
   * @example "redir.net"
   * @note If not set, the domain name will be used as the hosted zone name
   */
  readonly hostedZone: route53.IHostedZone | string;
  // TODO: Validation
}

export interface CustomPath {
  /**
   * Path on the Redirector Distribution's URL Back-Half
   *
   * @example "/author"
   */
  readonly path: string;
  /**
   * Destination URL for the custom redirection
   *
   * @example "https://ssennett.net/"
   */
  readonly destination: string;
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

    let redirectFunctionCode = cloudfront.FunctionCode.fromInline(`
      function handler(event) {
          var location = "${props.targetUrl}";
                            
          var response = {
              statusCode: 302,
              statusDescription: "Found",
              headers: {
                  'location': { value: location },
                  'cloudfront-functions': { value: "redirect" }
              }
          };
          return response;
      }
    `);

    let kvsRedirectMap: cloudfront.IKeyValueStore | undefined;

    if (props.pathRedirects) {
      const pathRedirectsFileTemp = path.join(__dirname, 'tempname.json');

      const pathRedirectsDataFileContents = {
        data: props.pathRedirects.map(pathRedirect => ({
          key: pathRedirect.path,
          value: pathRedirect.destination,
        })),
      };

      fs.writeFileSync(pathRedirectsFileTemp, JSON.stringify(pathRedirectsDataFileContents));

      kvsRedirectMap = new cloudfront.KeyValueStore(this, 'RedirectMap', {
        source: cloudfront.ImportSource.fromAsset(pathRedirectsFileTemp),
      });

      redirectFunctionCode = cloudfront.FunctionCode.fromInline(`
        import cf from 'cloudfront';

        const kvsId = '${kvsRedirectMap.keyValueStoreId}';
        const kvsHandle = cf.kvs(kvsId);

        async function handler(event) {
            const key = event.request.uri
            let location = "${props.targetUrl}" // Default value

            try {
                location = await kvsHandle.get(key);
            } catch (err) {
                console.log('default');
            }
            var response = {
                statusCode: 302,
                statusDescription: "Found",
                headers: {
                    'location': { value: location },
                    'cloudfront-functions': { value: "redirect" }
                }
            };
            return response;
        }
      `);
    }

    const functionRedirect = new cloudfront.Function(this, 'RedirectFunction', {
      code: redirectFunctionCode,
      keyValueStore: props.pathRedirects ? kvsRedirectMap : undefined,
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

    /**
     * URL of the CloudFront Distribution that has been generated
     */
    this.cfDistributionUrl = `https://${distribution.domainName}`;
    /**
     * URL of the Redirector site. Either returns the custom domain, or else returns the CloudFront Distribution URL
     */
    this.url = props.customDomain ? `https://${props.customDomain.domainName}` : this.cfDistributionUrl;
  }
}