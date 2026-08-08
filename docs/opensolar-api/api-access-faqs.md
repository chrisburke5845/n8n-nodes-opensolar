# API Access FAQs

## How does the API Access plan work?

Organisations with an enabled API Access plan are charged per project created. This includes unlimited API calls and webhook events.

## What happens when my wallet balance is low or empty?

API access will continue to function, but new project creation will be blocked. To avoid disruptions, ensure your wallet has auto top-up enabled.

## What is the difference between API Access and Raw Data API Access?

**API Access** lets you use the API to see and update project/contact info, but not the full design data in the endpoints or proposal data. **Raw Data API Access** adds the full design, proposal data, and `custom_data` in responses.

> **Tip:**
>
> Raw Data API Access is priced higher than API Access. You only need one of the two: if you enable Raw Data API Access, it already includes the benefits of API Access, so you don't need both.

| Endpoint | API Access | Raw Data API Access |
| --- | --- | --- |
| [Customer Contacts](contacts.md) `/api/orgs/:org_id/contacts/` | Yes | Yes |
| [Projects](projects.md) `/api/orgs/:org_id/projects/` | Yes | Yes |
| [Project Details](projects.md) `/api/orgs/:org_id/projects/:id/` | Yes (excludes [Design Data](#what-is-design-data-zip)) | Yes |
| [Systems](system.md) `/api/orgs/:org_id/systems/:id/` | Yes | Yes |
| [System Details](system-details.md) `/api/orgs/:org_id/projects/:project_id/systems/details/` | Yes (excludes [`custom_data`](#what-is-the-custom_data-field)) | Yes |
| [Project Files](private-files.md) `/api/orgs/:org_id/private_files/` | Yes | Yes |
| [Proposal Data](proposal-data.md) `/api/user_logins/` | No | Yes |
| [Webhooks](webhooks.md) | Yes | Yes |

## What if both API Access and Raw Data API Access products are enabled?

OpenSolar will prioritise the Raw Data API Access product and charge accordingly.

## What happens after I disable the API Access wallet product?

Projects purchased while the wallet product was enabled will retain API access. All other projects will lose API access and webhook functionality.

## Are there throttle limits?

Yes, throttle limits remain in effect. See [Throttle Limits](throttle.md) for details.

## What is "Design Data Zip"?

The `design` field is the project's full solar system design. It is a single string of **gzip + base64**, which holds everything needed to describe the site, the systems, and how they're presented:

- **Scene / 3D layout** — Views, map data, terrain
- **Systems** — One or more solar systems (panels, inverters, batteries, etc.)
- **Components** — Modules, inverters, batteries, "others" (e.g. heat pumps), with IDs and quantities
- **Pricing and financials** — Payment options, adders, incentives, bills (current/proposed)
- **Energy and performance** — Output (annual/monthly/hourly), system losses, calculator metadata
- **Layout details** — Module groups (azimuth, slope, layout), MPPT config, backup metrics, etc.

> **Note:**
>
> Many of the design data values are accessible outside this Zip through other endpoints. Only for some rare scenarios would this much detail be necessary — for example if an org wants to know the itemised price and cost breakdown.

If your organisation hasn't built any logic to unzip and decode the base64 string, it means you have not been using the Design data. See [Decompressing Design Data](projects.md#decompressing-design-data) for step-by-step decompression instructions with code examples in Python and JavaScript.

## What is the "custom_data" field?

System-level `custom_data` is a JSON object that can contain integration and feature-specific data for that system. It is used for things like:

- **proposal_data** — Controls how the system is shown in proposals, e.g.:
  - `show_battery_in_proposal` — Whether to show the battery in the proposal
  - `battery_price_to_show` — Which battery price to display

## What is "Proposal Data"?

The `/api/user_logins/` endpoint is used for generating OpenSolar's proposal. It returns all the details that an OpenSolar proposal can showcase to the end customer — system designs, pricing, energy output, panel placement, financial metrics, and more.

When called via the API, it gives you access to:

- **Cost and price breakdowns** — Itemised pricing, line items, adders, and discount details per system
- **Panel placement and orientation** — Exact panel layout, azimuth, tilt, and module group details
- **Energy production** — Annual and monthly output, specific yield, shading losses, and capacity factor
- **Financial metrics** — Payback period, NPV, IRR, ROI, and LCOE
- **Hardware details** — Full module, inverter, battery, and other component specifications
- **Utility and billing** — Before/after solar bill calculations, tariff data, and consumption offsets

See [Proposal Data](proposal-data.md) for full endpoint documentation, response structure, and code examples.

## What are common use cases for each plan?

### API Access

- **CRM integration** — Sync project status, contacts, and workflow stages with your CRM
- **Document automation** — Generate proposals, contracts, and reports via the API
- **Project management** — Create and update projects, manage team assignments
- **Webhook-driven workflows** — React to project events in real-time

### Raw Data API Access

Everything in API Access, plus:

- **Custom reporting** — Build detailed cost, pricing, and margin reports from proposal data
- **Engineering and permitting** — Extract panel placement, orientation, and site data for permit applications
- **Portfolio analytics** — Aggregate financial metrics (payback, IRR, NPV) across your project portfolio
- **Energy monitoring** — Compare forecasted vs actual energy production using detailed output data
- **ERP integration** — Feed itemised cost breakdowns and component lists into your ERP system
- **Design validation** — Access raw design data for QA and compliance checks

## How do I enable API Access or Raw Data API Access?

1. Navigate to **Control > Wallet** in the OpenSolar WebApp
2. Enable your chosen product (**API Access** or **Raw Data API Access**)
3. Ensure sufficient wallet balance for per-project charges

For step-by-step instructions, see [How to Set Up Your OpenSolar Wallet and Enable API Access Plans](https://support.opensolar.com/hc/en-us/articles/15205080027407-How-to-Set-Up-Your-OpenSolar-Wallet-and-Enable-API-Access).

> **Note:**
>
> After an API Access (wallet) product has been enabled for your organisation, access changes can take up to 5 minutes to take effect.
