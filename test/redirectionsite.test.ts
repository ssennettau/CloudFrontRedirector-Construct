import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

// Dummy Resources used for Testing
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { RedirectionSite } from '../src';

test('Basic CDK Check', () => {
  const app = new App();
  const stack = new Stack(app, 'SmokeStack');

  new s3.Bucket(stack, 'TestBucket');

  const template = Template.fromStack(stack);

  template.hasResource('AWS::S3::Bucket', 1);
});

test('Redirection Site - Basic', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  new RedirectionSite(stack, 'RedirectionSite', {
    targetUrl: 'ssennett.net',
  });

  const template = Template.fromStack(stack);

  const templateJson = JSON.stringify(template.toJSON(), null, 4);
  console.debug(templateJson);

  template.hasResource('AWS::CloudFront::Distribution', 1);
});

test('Redirection Site - Custom Domain (string value)', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack', {
    env: {
      region: 'us-east-1',
      account: '123456789012',
    },
  });

  new RedirectionSite(stack, 'RedirectionSite', {
    targetUrl: 'ssennett.net',
    customDomain: {
      domainName: 'test.test.local',
      hostedZone: 'test.local',
    },
  });

  const template = Template.fromStack(stack);

  const templateJson = JSON.stringify(template.toJSON(), null, 4);
  console.debug(templateJson);

  template.hasResource('AWS::Route53::RecordSet', 1);
});

test('Redirection Site - Custom Domain (HostedZone object)', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack', {
    env: {
      region: 'us-east-1',
      account: '123456789012',
    },
  });

  const testHostedZone: route53.IHostedZone = new route53.HostedZone(stack, 'TestHostedZone', {
    zoneName: 'test.local',
  });

  new RedirectionSite(stack, 'RedirectionSite', {
    targetUrl: 'ssennett.net',
    customDomain: {
      domainName: 'test.test.local',
      hostedZone: testHostedZone,
    },
  });

  const template = Template.fromStack(stack);

  const templateJson = JSON.stringify(template.toJSON(), null, 4);
  console.debug(templateJson);

  template.hasResource('AWS::Route53::RecordSet', 1);
});