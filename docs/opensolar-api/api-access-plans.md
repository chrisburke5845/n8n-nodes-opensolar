# API Access Plans

From **17 March** onwards, API access is restricted to organisations that have opted into a paid plan. Organisations on **API Access** or **Raw Data API Access** can use the API. A **30-day free trial** is available for both plans; users can opt in to try API access before subscribing.

## Tier comparison

| Plan | Behaviour |
| --- | --- |
| **API Access** | Core API access. Most endpoints behave the same. Some endpoints return a reduced set of data (see Endpoint-specific behaviour below). |
| **Raw Data API Access** | Same as API Access, plus full design-related data where applicable (e.g. full System Details response, compressed `design` on Projects). |

For step-by-step instructions on enabling a plan, see [How to Set Up Your OpenSolar Wallet and Enable API Access Plans](https://support.opensolar.com/hc/en-us/articles/15205080027407-How-to-Set-Up-Your-OpenSolar-Wallet-and-Enable-API-Access).

> **Note:**
>
> After an API Access (wallet) product has been enabled for your organisation, access changes can take up to 5 minutes to take effect.

### System Details

**Endpoint:** `GET /api/orgs/:org_id/projects/:project_id/systems/details/`

- **API Access:** The response will omit the `custom_data` field.
- **Raw Data API Access:** The full response is returned as documented in [Systems Details](system-details.md).

### Projects

**Endpoint:** `GET /api/orgs/:org_id/projects/:id/`

- **API Access:** The `design` field (compressed design data) is omitted or null.
- **Raw Data API Access:** The `design` field is populated with the compressed design data.
