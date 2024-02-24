import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Stephen Sennett',
  authorAddress: 'ssennett@ssennett.net',
  cdkVersion: '2.127.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: 'cloudfrontredirector',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/ssennett/CloudFrontRedirector-Construct.git',
  description: 'CDK Construct to simplify using CloudFront to redirect entire domains or path stubs', /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
});
project.synth();