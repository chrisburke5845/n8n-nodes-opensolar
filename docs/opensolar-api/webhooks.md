# Overview

Webhooks can be used to keep in sync with OpenSolar.
To create a webhook, provide OpenSolar with an endpoint and the appropriate headers.

## Endpoint

| Endpoint | Description | Parameters |
| --- | --- | --- |
| GET /api/orgs/:org_id/webhooks/ | Get Org webhooks |  |
| POST /api/orgs/:org_id/webhooks/ | Create Org webhooks | trigger_fields, payload_fields, enabled (true/false), debug (true/false), endpoint |
| PATCH /api/orgs/:org_id/webhooks/:id | Update Org webhooks | trigger_fields, payload_fields, enabled (true/false), debug (true/false), endpoint |

**Parameters**

- debug (boolean): required when creating a webhook. Currently 'debug' flag is not used.
- enabled (boolean): required when creating a webhook.
- endpoint (string): required when creating a webhook.
- trigger_fields (json): Fire the webhook only when one of these fields changes. On **create**, a blank value uses the **Default values** below. On an **existing** webhook, a blank value is treated as **`null`**.
- payload_fields (json): Limit the outbound JSON to these paths. On **create**, a blank value uses the **Default values** below. On an **existing** webhook, a blank value is treated as **`null`**.

> **Info:**
>
> - **Blank `trigger_fields` and `payload_fields`**
>
>   - **On webhook creation**
>
>     - When `trigger_fields` is left blank, the default value applies (see **Default values**).
>     - When `payload_fields` is left blank, the default value applies (see **Default values**).
>   - **On existing webhooks**
>
>     - A blank `trigger_fields` is treated as `null`.
>     - A blank `payload_fields` is treated as `null`.
> - Only the models and fields specified in the `trigger_fields` will trigger the webhook. For example, a webhook with `["contact.first_name", "contact.last_name"]` as its trigger will not process updates made to the Event and Project models.
> - Models followed by a `.*` such as `project.*`, `event.*`, and `contact.*` allow a webhook to include all fields attached to that model. This applies to both `trigger_fields` & `payload_fields`.

> **Warning:**
>
> - Setting the `trigger_fields` to `["project.*", "event.*", "contact.*"]` isn't recommended since this might cause unnecessary webhook calls.
> - **Missing model in `payload_fields`:** A model omitted from `payload_fields` is treated as including all data for that model—the same as listing `model.*` for it. For example, `["project.*", "event.*"]` is equivalent to `["project.*", "event.*", "contact.*"]` (and likewise for other models). `trigger_fields` does not work this way: if a model is missing from `trigger_fields`, the webhook does not run when that model changes.

**Default values**

- trigger_fields: ["contact.*", "event.*", "project.address", "project.zip", "project.state", "project.lat", "project.lon", "project.country", "project.locality", "project.county", "project.contacts", "project.identifier", "project.notes", "project.systems.price_including_tax", "project.systems.output_annual_kwh", "project.systems.modules", "project.systems.inverters", "project.systems.others", "project.systems.batteries", "project.systems.kw_stc", "project.stage", "project.system_sold", "project.payment_option_sold", "project.sold_date", "project.installation_date", "project.system_installed", "project.assigned_installer_role", "project.assigned_role", "project.assigned_site_inspector_role", "project.events_data", "project.usage", "project.utility_tariff_or_guess", "project.utility_tariff_proposed", "quote.*", "quoteactivitylog.*"]
- payload_fields: ["contact.*", "event.*", "project.address", "project.zip", "project.state", "project.lat", "project.lon", "project.country_iso2", "project.locality", "project.county", "project.contacts_data.email", "project.contacts_data.family_name", "project.contacts_data.first_name", "project.contacts_data.id", "project.contacts_data.phone", "project.systems.price_including_tax", "project.systems.output_annual_kwh", "project.systems.url", "project.systems.modules", "project.systems.inverters", "project.systems.others", "project.systems.batteries", "project.systems.kw_stc", "project.id", "project.identifier", "project.notes", "project.site_notes", "project.actions", "project.stage", "project.system_sold", "project.payment_option_sold", "project.sold_date", "project.installation_date", "project.system_installed", "project.assigned_installer_role_data.user_email", "project.assigned_installer_role_data.id", "project.assigned_installer_role_data.first_name", "project.assigned_installer_role_data.family_name", "project.assigned_installer_role_data.phone", "project.assigned_role_data.user_email", "project.assigned_role_data.id", "project.assigned_role_data.first_name", "project.assigned_role_data.family_name", "project.assigned_role_data.phone", "project.assigned_site_inspector_role_data.user_email", "project.assigned_site_inspector_role_data.id", "project.assigned_site_inspector_role_data.first_name", "project.assigned_site_inspector_role_data.family_name", "project.assigned_site_inspector_role_data.phone", "project.events_data", "project.usage", "project.utility_tariff_or_guess.data", "project.utility_tariff_proposed_or_guess.data", "quote.*", "quoteactivitylog.*"]

## Example

### Creating a Webhook

Sample POST request and response (Creating a webhook):

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/webhooks/"
--request POST
-H "Content-Type: application/json"
-H "Authorization: Bearer <token>"
-d
'{"endpoint": "https://somesolar.com/api/",
"headers": "{\"Authorization\": \"Token <your-token>\"}",
"enabled": true, "debug": false,
"trigger_fields":["project.contract_date"],
"payload_fields":["project.*"]}'
```

Sample PATCH request and response (Update an existing webhook):

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/webhooks/123/"
--request PATCH
-H "Content-Type: application/json"
-H "Authorization: Bearer <token>"
-d
'{"enabled": false,
"trigger_fields":["project.installation_date"],
"payload_fields":["project.*"]}'
```
