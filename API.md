# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### RedirectionSite <a name="RedirectionSite" id="cdk-cloudfront-redirector.RedirectionSite"></a>

#### Initializers <a name="Initializers" id="cdk-cloudfront-redirector.RedirectionSite.Initializer"></a>

```typescript
import { RedirectionSite } from 'cdk-cloudfront-redirector'

new RedirectionSite(scope: Construct, id: string, props: RedirectionSiteProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cloudfront-redirector.RedirectionSite.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-cloudfront-redirector.RedirectionSite.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-cloudfront-redirector.RedirectionSite.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-cloudfront-redirector.RedirectionSiteProps">RedirectionSiteProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-cloudfront-redirector.RedirectionSite.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-cloudfront-redirector.RedirectionSite.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-cloudfront-redirector.RedirectionSite.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-cloudfront-redirector.RedirectionSiteProps">RedirectionSiteProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-cloudfront-redirector.RedirectionSite.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-cloudfront-redirector.RedirectionSite.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-cloudfront-redirector.RedirectionSite.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-cloudfront-redirector.RedirectionSite.isConstruct"></a>

```typescript
import { RedirectionSite } from 'cdk-cloudfront-redirector'

RedirectionSite.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-cloudfront-redirector.RedirectionSite.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cloudfront-redirector.RedirectionSite.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-cloudfront-redirector.RedirectionSite.property.cfDistributionUrl">cfDistributionUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-cloudfront-redirector.RedirectionSite.property.url">url</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-cloudfront-redirector.RedirectionSite.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cfDistributionUrl`<sup>Required</sup> <a name="cfDistributionUrl" id="cdk-cloudfront-redirector.RedirectionSite.property.cfDistributionUrl"></a>

```typescript
public readonly cfDistributionUrl: string;
```

- *Type:* string

---

##### `url`<sup>Required</sup> <a name="url" id="cdk-cloudfront-redirector.RedirectionSite.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### CustomDomainProps <a name="CustomDomainProps" id="cdk-cloudfront-redirector.CustomDomainProps"></a>

#### Initializer <a name="Initializer" id="cdk-cloudfront-redirector.CustomDomainProps.Initializer"></a>

```typescript
import { CustomDomainProps } from 'cdk-cloudfront-redirector'

const customDomainProps: CustomDomainProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cloudfront-redirector.CustomDomainProps.property.domainName">domainName</a></code> | <code>string</code> | Domain name to use for the redirector (used as the record set name). |
| <code><a href="#cdk-cloudfront-redirector.CustomDomainProps.property.hostedZone">hostedZone</a></code> | <code>string \| aws-cdk-lib.aws_route53.IHostedZone</code> | Hosted Zone to use for the redirector (used as the record set zone). |

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="cdk-cloudfront-redirector.CustomDomainProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

Domain name to use for the redirector (used as the record set name).

---

*Example*

```typescript
"i.redir.net"
```


##### `hostedZone`<sup>Required</sup> <a name="hostedZone" id="cdk-cloudfront-redirector.CustomDomainProps.property.hostedZone"></a>

```typescript
public readonly hostedZone: string | IHostedZone;
```

- *Type:* string | aws-cdk-lib.aws_route53.IHostedZone

Hosted Zone to use for the redirector (used as the record set zone).

---

*Example*

```typescript
"redir.net"@note[object Object]
```


### CustomPath <a name="CustomPath" id="cdk-cloudfront-redirector.CustomPath"></a>

#### Initializer <a name="Initializer" id="cdk-cloudfront-redirector.CustomPath.Initializer"></a>

```typescript
import { CustomPath } from 'cdk-cloudfront-redirector'

const customPath: CustomPath = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cloudfront-redirector.CustomPath.property.destination">destination</a></code> | <code>string</code> | Destination URL for the custom redirection. |
| <code><a href="#cdk-cloudfront-redirector.CustomPath.property.path">path</a></code> | <code>string</code> | Path on the Redirector Distribution's URL Back-Half. |

---

##### `destination`<sup>Required</sup> <a name="destination" id="cdk-cloudfront-redirector.CustomPath.property.destination"></a>

```typescript
public readonly destination: string;
```

- *Type:* string

Destination URL for the custom redirection.

---

*Example*

```typescript
"https://ssennett.net/"
```


##### `path`<sup>Required</sup> <a name="path" id="cdk-cloudfront-redirector.CustomPath.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

Path on the Redirector Distribution's URL Back-Half.

---

*Example*

```typescript
"/author"
```


### RedirectionSiteProps <a name="RedirectionSiteProps" id="cdk-cloudfront-redirector.RedirectionSiteProps"></a>

#### Initializer <a name="Initializer" id="cdk-cloudfront-redirector.RedirectionSiteProps.Initializer"></a>

```typescript
import { RedirectionSiteProps } from 'cdk-cloudfront-redirector'

const redirectionSiteProps: RedirectionSiteProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cloudfront-redirector.RedirectionSiteProps.property.targetUrl">targetUrl</a></code> | <code>string</code> | Destination URL for all redirections. |
| <code><a href="#cdk-cloudfront-redirector.RedirectionSiteProps.property.customDomain">customDomain</a></code> | <code><a href="#cdk-cloudfront-redirector.CustomDomainProps">CustomDomainProps</a></code> | Custom Domain for the redirector to use (Optional). |
| <code><a href="#cdk-cloudfront-redirector.RedirectionSiteProps.property.pathRedirects">pathRedirects</a></code> | <code><a href="#cdk-cloudfront-redirector.CustomPath">CustomPath</a>[]</code> | List of custom back-halves for specific redirections. |

---

##### `targetUrl`<sup>Required</sup> <a name="targetUrl" id="cdk-cloudfront-redirector.RedirectionSiteProps.property.targetUrl"></a>

```typescript
public readonly targetUrl: string;
```

- *Type:* string

Destination URL for all redirections.

---

*Example*

```typescript
https://mysite.com/
```


##### `customDomain`<sup>Optional</sup> <a name="customDomain" id="cdk-cloudfront-redirector.RedirectionSiteProps.property.customDomain"></a>

```typescript
public readonly customDomain: CustomDomainProps;
```

- *Type:* <a href="#cdk-cloudfront-redirector.CustomDomainProps">CustomDomainProps</a>
- *Default:* Not configured

Custom Domain for the redirector to use (Optional).

---

##### `pathRedirects`<sup>Optional</sup> <a name="pathRedirects" id="cdk-cloudfront-redirector.RedirectionSiteProps.property.pathRedirects"></a>

```typescript
public readonly pathRedirects: CustomPath[];
```

- *Type:* <a href="#cdk-cloudfront-redirector.CustomPath">CustomPath</a>[]
- *Default:* No custom back-half redirections

List of custom back-halves for specific redirections.

Any non-matches will default back to the `targetUrl`.

---

*Example*

```typescript
- [{ path: "/author", destination: "https://ssennett.net/" }
```




