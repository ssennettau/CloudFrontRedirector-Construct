# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### RedirectionSite <a name="RedirectionSite" id="cloudfrontredirector.RedirectionSite"></a>

#### Initializers <a name="Initializers" id="cloudfrontredirector.RedirectionSite.Initializer"></a>

```typescript
import { RedirectionSite } from 'cloudfrontredirector'

new RedirectionSite(scope: Construct, id: string, props: RedirectionSiteProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cloudfrontredirector.RedirectionSite.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cloudfrontredirector.RedirectionSite.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cloudfrontredirector.RedirectionSite.Initializer.parameter.props">props</a></code> | <code><a href="#cloudfrontredirector.RedirectionSiteProps">RedirectionSiteProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cloudfrontredirector.RedirectionSite.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cloudfrontredirector.RedirectionSite.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cloudfrontredirector.RedirectionSite.Initializer.parameter.props"></a>

- *Type:* <a href="#cloudfrontredirector.RedirectionSiteProps">RedirectionSiteProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cloudfrontredirector.RedirectionSite.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cloudfrontredirector.RedirectionSite.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cloudfrontredirector.RedirectionSite.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cloudfrontredirector.RedirectionSite.isConstruct"></a>

```typescript
import { RedirectionSite } from 'cloudfrontredirector'

RedirectionSite.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cloudfrontredirector.RedirectionSite.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cloudfrontredirector.RedirectionSite.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cloudfrontredirector.RedirectionSite.property.cfDistributionUrl">cfDistributionUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cloudfrontredirector.RedirectionSite.property.url">url</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cloudfrontredirector.RedirectionSite.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cfDistributionUrl`<sup>Required</sup> <a name="cfDistributionUrl" id="cloudfrontredirector.RedirectionSite.property.cfDistributionUrl"></a>

```typescript
public readonly cfDistributionUrl: string;
```

- *Type:* string

---

##### `url`<sup>Required</sup> <a name="url" id="cloudfrontredirector.RedirectionSite.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### CustomDomainProps <a name="CustomDomainProps" id="cloudfrontredirector.CustomDomainProps"></a>

#### Initializer <a name="Initializer" id="cloudfrontredirector.CustomDomainProps.Initializer"></a>

```typescript
import { CustomDomainProps } from 'cloudfrontredirector'

const customDomainProps: CustomDomainProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cloudfrontredirector.CustomDomainProps.property.domainName">domainName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cloudfrontredirector.CustomDomainProps.property.hostedZone">hostedZone</a></code> | <code>string \| aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="cloudfrontredirector.CustomDomainProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

---

##### `hostedZone`<sup>Required</sup> <a name="hostedZone" id="cloudfrontredirector.CustomDomainProps.property.hostedZone"></a>

```typescript
public readonly hostedZone: string | IHostedZone;
```

- *Type:* string | aws-cdk-lib.aws_route53.IHostedZone

---

### RedirectionSiteProps <a name="RedirectionSiteProps" id="cloudfrontredirector.RedirectionSiteProps"></a>

#### Initializer <a name="Initializer" id="cloudfrontredirector.RedirectionSiteProps.Initializer"></a>

```typescript
import { RedirectionSiteProps } from 'cloudfrontredirector'

const redirectionSiteProps: RedirectionSiteProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cloudfrontredirector.RedirectionSiteProps.property.targetUrl">targetUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cloudfrontredirector.RedirectionSiteProps.property.customDomain">customDomain</a></code> | <code><a href="#cloudfrontredirector.CustomDomainProps">CustomDomainProps</a></code> | *No description.* |

---

##### `targetUrl`<sup>Required</sup> <a name="targetUrl" id="cloudfrontredirector.RedirectionSiteProps.property.targetUrl"></a>

```typescript
public readonly targetUrl: string;
```

- *Type:* string

---

##### `customDomain`<sup>Optional</sup> <a name="customDomain" id="cloudfrontredirector.RedirectionSiteProps.property.customDomain"></a>

```typescript
public readonly customDomain: CustomDomainProps;
```

- *Type:* <a href="#cloudfrontredirector.CustomDomainProps">CustomDomainProps</a>

---



