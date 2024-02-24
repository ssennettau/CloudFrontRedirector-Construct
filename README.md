# CloudFrontRedirector-Construct

CDK Construct to simplify using CloudFront to redirect entire domains or back-half stubs.

## Concept

Needs to redirect domains or building custom link shorteners is a common pattern required by many different solutions. This project simplifies using Amazon CloudFront with CloudFront Functions to rewrite the requests, forwarding users to another location.

![CloudFront Redirector Construct Diagram](docs/cfredirector.png)

## Usage

For more details, check the auto-generated [API](API.md).

### Installation 
Before using this construct, you will need to import it for use in your AWS CDK stack.

```bash
# CDK for Typescript
npm install cdk-cloudfront-redirector
```

### Integrating

```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RedirectionSite } from 'cdk-cloudfront-redirector';

export class DemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const redirect = new RedirectionSite(this, "RedirectionForWebsite", {
      targetUrl: "https://ssennett.net/",
    });

    // Return outputs
    new cdk.CfnOutput(this, "RedirectionUrl", { value: redirect.cfDistributionUrl })
  }
}
```

## License

All code in this project is licensed under the [MIT License](LICENSE).