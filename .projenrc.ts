import { awscdk } from 'projen';

const cdkVersion = '2.127.0';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Stephen Sennett',
  authorAddress: 'ssennett@ssennett.net',
  cdkVersion: cdkVersion,
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.2.0',
  name: 'cdk-cloudfront-redirector',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/ssennett/CloudFrontRedirector-Construct.git',
  description: 'CDK Construct to simplify using CloudFront to redirect entire domains or back-half stubs',
  keywords: [
    'cdk',
    'cdk-construct',
  ],
  license: 'MIT',
  gitignore: [
    '.DS_Store',
  ],
});
project.synth();