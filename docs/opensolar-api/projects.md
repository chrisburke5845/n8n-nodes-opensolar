# Projects

A Project stores all the data for a particular project location, including [system designs], assigned contacts and a team members, utility information, project-specific files, events, etc.

## Endpoints

| Endpoint | Description | Query Parameters |
| --- | --- | --- |
| GET /api/orgs/:org_id/projects/ | List Projects | page, limit, fieldset (list, studio) |
| GET /api/orgs/:org_id/projects/:id/ | Get Project |  |
| POST /api/orgs/:org_id/projects/ | Create Project |  |
| PATCH /api/orgs/:org_id/projects/:id/ | Update Project |  |
| DELETE /api/orgs/:org_id/projects/:id/ | Delete Project |  |

## Reading/Writing Related Resources

### Assigned Role

- `project.assigned_role_data` is read-only data for the assigned role, specified in project.assigned_role_id.
- To replace the role assigned to this project, update project.assigned_role with the URL for the new role.
- To update the data for this role who has been assigned to the project, use the `Update Role` endpoint for the resource found at the url in `project.assigned_role`.

### Contacts

- `project.contacts_data` is a read-only data for contacts associated with the project.
- To create a new project while creating or updating a project, use the `project.contacts_new` field.
- To update the data for a contact associated with the project, use the `Update Contact` endpoint for the resource found at the url in `project.contacts`.
- To replace the assigned contacts for a project, call the `Update Project` endpoint and include new contact urls in `project.contacts`.

### Private Files

Each project can have private files attached. You can access a project's private files in two ways:

**1. From the project response:**

When you retrieve a project with `GET /api/orgs/:org_id/projects/:id/`, the response includes:

- **`private_files`** — A list of hyperlinks to private file resources (e.g. `/api/orgs/123/private_files/456/`). You can use these URLs to fetch, update, or delete individual files. This field can be used for reading and writing project–file associations.
- **`private_files_data`** — An embedded list of private file objects (read-only) for the project. Use this when you need file metadata (title, tags, size, etc.) without extra requests.

**2. List private files filtered by project:**

Call the [Private Files](private-files.md) endpoint with a project filter:

```
GET /api/orgs/:org_id/private_files/?project=/api/orgs/:org_id/projects/:project_id/
```

This returns all private files that belong to that project, subject to access rules. For full details, see the [Private Files](private-files.md) documentation.

## Examples

### Getting a list of Projects

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/projects/"
--header "Authorization: Bearer <token>"
```

**Response**

```
[
  {
    "id": 3763174,
    "title": "6 Hopetoun Ave",
    "contacts_data": [
      {
        "id": 1721096,
        "email": "gconstanza@vanderlayindustries.com",
        "phone": "0400000000",
        "url": "https://api.opensolar.com/api/orgs/62854/contacts/1721096/",
        "first_name": "George",
        "family_name": "Costanza",
        "display": "George Costanza",
        "passport_number": "",
        "licence_number": "",
        "custom_contact_info_1": "",
        "custom_contact_info_2": "",
        "user_id": null,
        "org_id": 62854,
        "identifier": "",
        "type": 0
      }
    ],
    "business_name": null,
    "address": "6 Hopetoun Ave",
    "url": "https://api.opensolar.com/api/orgs/62854/projects/3763174/",
    "contacts": [
      "https://api.opensolar.com/api/orgs/62854/contacts/1721096/",
      "https://api.opensolar.com/api/orgs/62854/contacts/2774309/"
    ],
    "priority": 2,
    "stars": [],
    "stage": 0,
    "org_id": 62854,
    "is_lite": false,
    "modified_date": "2024-02-12T01:18:20.475934Z",
    "created_date": "2024-01-31T00:58:18.186310Z",
    "shared_with": [],
    "org_name": "Demo Solar Apparatus Install & Maintenance Demo",
    "customer_proposal_data": null,
    "workflow": {
      "id": 3542964,
      "workflow_id": 10422,
      "active_stage_id": 52144
    },
    "custom_data": null
  }
]
```

### Getting a single Project

> **Note:**
>
> The `design` field (compressed design data) is only present for organisations on **Raw Data API Access**. On **API Access**, this field is omitted or null. See [API Access Plans](api-access-plans.md) for details.

**Request**

```
curl --location 'https://api.opensolar.com/api/orgs/:org_id/projects/:project_id/' \
--header 'Authorization: Bearer <token>'
```

**Response**

```
{
    "access": 2,
    "events": [
      ...
    ],
    "actions": [
      ...
    ],
    "address": "6 Hopetoun Ave",
    "assigned_role_data": {
      ...
    },
    "assigned_role_email": "g****@l*******.com",
    "assigned_role_id": 101776,
    "assigned_role_name": "George Costanza",
    "assigned_role_phone": "*****",
    "assigned_role": "https://api.opensolar.com/api/orgs/62854/roles/101776/",
    "assigned_role_accreditation": "",
    "assigned_installer_role_data": null,
    "assigned_installer_role": null,
    "assigned_site_inspector_role_data": null,
    "assigned_site_inspector_role": null,
    "assigned_designer_role_data": {
      ...
    },
    "assigned_designer_role_email": "g****@l*******.com",
    "assigned_designer_role_id": 101776,
    "assigned_designer_role_name": "George Costanza",
    "assigned_designer_role_phone": "*****",
    "assigned_designer_role": "https://api.opensolar.com/api/orgs/62854/roles/101776/",
    "assigned_salesperson_role_data": {
      ...
    },
    "assigned_salesperson_role_email": "g****@l*******.com",
    "assigned_salesperson_role_id": 101776,
    "assigned_salesperson_role_name": "George Costanza",
    "assigned_salesperson_role_phone": "*******",
    "assigned_salesperson_role": "https://api.opensolar.com/api/orgs/62854/roles/101776/",
    "available_customer_actions": [
      ...
    ],
    "business_identifier": "",
    "business_name": null,
    "configuration_override": null,
    "configuration": {
      ...
    },
    "costing_override": null,
    "costing": {
      ...
    },
    "contacts_data": [
      ...
    ],
    "contacts": [
      ...
    ],
    "contract_date": null,
    "contract": null,
    "country_iso2": "AU",
    "country_name": "Australia",
    "country": "https://api.opensolar.com/api/countries/14/",
    "county": null,
    "created_date": "2024-01-31T00:58:18.186310Z",
    "design": "...",
    "events_data": [
      ...
    ],
    "greenlancer_project_id": null,
    "id": 3763174,
    "identifier": "192984a9-3475-41a3-b136-8947588ac391",
    "is_residential": true,
    "is_pricing_locked": false,
    "installation_date": null,
    "language": "en",
    "language_override": null,
    "last_calculation_error": null,
    "lat": -33.85868365208357,
    "lead_source": "",
    "locality": "Vaucluse",
    "lon": 151.27518445393818,
    "meter_identifier": "",
    "modified_date": "2024-02-12T01:18:20.475934Z",
    "notes": "",
    "number_of_phases": null,
    "number_of_wires": null,
    "number_of_storeys": null,
    "org_id": 62854,
    "org_name": "Demo Solar Apparatus Install & Maintenance Demo",
    "org": "https://api.opensolar.com/api/orgs/62854/",
    "parcel_identifier": "",
    "payment_option_sold": null,
    "priority": 2,
    "private_files_data": [],
    "private_files": [],
    "proposal_message": "",
    "proposal_content": "",
    "contract_terms": "",
    "premium_imagery_activations": [],
    "project_installed": null,
    "project_sold": null,
    "proposal_template": null,
    "proposal_template_settings": {
      ...
    },
    "roof_type": null,
    "serial_numbers_panels": "",
    "serial_numbers_inverters": "",
    "serial_numbers_batteries": "",
    "share_link": "https://api.opensolar.com/share/3763174/?token=ABS2CYSP7aHt8M9lcbs",
    "simulate_first_year_only": false,
    "site_notes": "",
    "sold_date": null,
    "stage_warning": "The stage field is deprecated, and presently represents the project's workflow milestone. Please refer to https://developers.opensolar.com/ for the migration steps.",
    "stage": 0,
    "stars": [],
    "state": "NSW",
    "systems": [
      ...
    ],
    "system_sold": null,
    "system_installed": null,
    "tags_data": [],
    "tags": [],
    "temperature_max_override": null,
    "temperature_min_max": [
      ...
    ],
    "temperature_min_override": null,
    "testimonials_data": [],
    "testimonials": [],
    "timezone_offset": 11.0,
    "title": "6 Hopetoun Ave",
    "transactions_data": [],
    "url": "https://api.opensolar.com/api/orgs/62854/projects/3763174/",
    "usage_annual_or_guess": 7300,
    "usage": "...",
    "utility_tariff_current_guess": {
      ...
    },
    "utility_tariff_current_custom": "null",
    "utility_tariff_current_data": null,
    "utility_tariff_current": null,
    "utility_tariff_or_guess": {
      ...
    },
    "utility_tariff_proposed_custom": "null",
    "utility_tariff_proposed_data": null,
    "utility_tariff_proposed": null,
    "utility_tariff_proposed_or_guess": {
      ...
    },
    "valid_until_date": "2024-02-23",
    "wind_region": null,
    "has_cellular_coverage": 0,
    "federal_income_tax_rate_percentage": null,
    "state_income_tax_rate_percentage": null,
    "power_factor": null,
    "years_to_simulate": 20,
    "zip": "2030",
    "docusign_contract_envelope_id": null,
    "custom_project_info_1": "",
    "custom_project_info_2": "",
    "custom_project_info_3": "",
    "custom_project_info_4": "",
    "custom_project_info_5": "",
    "allow_email_notifications": true,
    "brighte_role_connection_status": "connection_missing",
    "auto_apply_max_simulate_years": false,
    "contract_template_mode": "payment-option",
    "is_lite": false,
    "custom_data": null,
    "shared_with": [],
    "workflows": [
      ...
    ],
    "customer_proposal_data": {
      ...
    },
    "workflow": {
      ...
    },
    "activated_premium_imagery_wallet_product_ids": []
}
```

### Decompressing Design Data

> **Warning:**
>
> The compressed `design` field is only populated for organisations with the **Raw Data API Access** product enabled. See [API Access Plans](api-access-plans.md) for details.

The `design` field on the project response contains the full project design as a **base64-encoded gzip-compressed JSON string**. To use this data, you need to decompress it.

#### Decompression Steps

1. **Base64 decode** the string to get the raw gzip bytes
2. **Gzip decompress** the bytes to get a UTF-8 JSON string
3. **JSON parse** the string to get the design object

#### Python

```
import base64
import gzip
import json

def decompress_design(compressed_design: str) -> dict:
    gzip_bytes = base64.b64decode(compressed_design)
    json_string = gzip.decompress(gzip_bytes).decode("utf-8")
    return json.loads(json_string)

# Usage
project = fetch_project(org_id, project_id)
design = decompress_design(project["design"])
systems = design.get("systems", [])
```

#### JavaScript / Node.js

```
const zlib = require("zlib");

function decompressDesign(compressedDesign) {
  const gzipBuffer = Buffer.from(compressedDesign, "base64");
  const jsonString = zlib.gunzipSync(gzipBuffer).toString("utf-8");
  return JSON.parse(jsonString);
}

// Usage
const project = await fetchProject(orgId, projectId);
const design = decompressDesign(project.design);
const systems = design.systems || [];
```

#### What's Inside the Design Data

The decompressed design JSON contains the full system calculation state. This includes:

**Site and 3D model:**

- **Roof geometry** and auto-facets GeoJSON (`autoFacetsGeoJson`)
- **Scene origin** coordinates and terrain data
- **Auto-design** GeoJSON and messages

**Per-system data:**

- **Pricing** — full pricing breakdown including `system_price_including_tax`, `costs`, `line_items`, `adders`, `margin`, `discount`, `dealer_fee`, `tax`, and `price_adjustments` per component type
- **Incentives** — `incentive_to_customer` and `incentive_to_installer` with individual incentive details (e.g. STC quantity, zone rating, incentive type)
- **Payment options** — complete payment option calculations including `cash_flows`, `utility_bill_savings_yearly`, `payback_year`, `net_present_value`, `internal_rate_of_return`, `quotation_lines`, and `featured_figures`
- **Bills** — current and proposed bill projections with scaling factors
- **Consumption** — self-consumption, grid independence, battery cycle data
- **Output** — annual and daily production data, capacity factor, calculator details
- **Environmentals** — CO2 tons, trees planted, car km equivalents
- **Module and inverter specs** — module/inverter/battery configuration, quantities, and component details
- **Design diagnostics** — facet counts, skipped grids, constraint results

### Creating a Project

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/projects/"
--header "Content-Type: application/json"
--header "Authorization: Bearer <bearer-token>"
--request POST
-d '{
"identifier": "123456",
"is_residential": "1",
"lead_source": "Door Knockers",
"notes": "Has a pool, needs LG panel.",
"lat": "35.12364",
"lon": "128.23216",
"address": "123 Fake st",
"locality": "Fakesville",
"state": "NSW",
"country_iso2": "AU",
"zip": "2020",
"number_of_phases": "1",
"roof_type": "https://api.opensolar.com/api/roof_types/6/",
"assigned_role": "https://api.opensolar.com/api/orgs/1/roles/123/", // assigned_installer_role and assigned_site_inspector_role also available
"contacts_new": [
    {
      "first_name": "George",
      "family_name": "Costanza",
      "email": "gconstanza@vanderlayindustries.com",
      "phone": "0400000000",
      "date_of_birth": "1990-01-01",
      "gender": "2" // 0 = unset, 1 = female, 2 = male
    }
  ]
}'
```

**Response**

```
{
  "address": "123 Fake st",
  "id": 6624,
  "identifier": "123456",
  "lat": 35.12364,
  "lead_source": "Door Knockers",
  "locality": "Fakesville",
  "lon": 128.23216,
  "notes":"Has a pool, needs LG panel.",
  "number_of_phases": 1,
  "org_id": 1,
  "org": "https://api.opensolar.com/api/orgs/1/",
  "state":"NSW",
  "systems": [
    ...
  ],
  "url": "https://api.opensolar.com/api/orgs/1/projects/6624/",
  "zip":"2020",
  "customer_proposal_data":null,
  "assigned_role_data": {
    "id": 1,
    "email": "bob@company.com.au",
    "is_admin": true,
    "user": "https://api.opensolar.com/auth/users/10/",
    "user_email": "bob@company.com",
    "org": "https://api.opensolar.com/api/orgs/30/",
    "is_hidden": false,
    "url": "https://api.opensolar.com/api/orgs/1/roles/50/",
    "first_name": "Bob",
    "family_name": "Company",
    "job_title": "Important Job",
    "accreditation": "",
    "user_phone": "",
    "display": "Bob S. Company",
    "phone": "94811111",
    "allow_email_notifications": true,
    "portrait_image": null,
    "google_calendar_id": null,
    "has_logged_in": true,
    "schedule_meeting_url": "https://calendly.com/bobby/customer-walk-through",
    "schedule_meeting_label": "Schedule a time to discuss!",
    "api_key_chat": "1233-333-11-9000",
    "user_is_staff": true,
    "org_name": "SunCo"
  },
  "assigned_role_email": "bob@company.com",
  "assigned_role_id": 1,
  "assigned_role_name": "Bob S. Company",
  "assigned_role_phone": "94811111",
  "assigned_role": "https://api.opensolar.com/api/orgs/1/roles/50/",
  "assigned_role_accreditation": "",
  "contacts": [
    "https://api.opensolar.com/api/orgs/1/contacts/60/"
  ],
  "contacts_data": [
    {
      "id": 60,
      "first_name": "George",
      "family_name": "Costanza",
      "email": "gconstanza@vanderlayindustries.com",
      "phone": "0400000000",
      "date_of_birth": "1990-01-01",
      "gender": 2,
      "url": "https://api.opensolar.com/api/orgs/1/contacts/60/"
    }
  ]
}
```

### Updating a Project

In this example we are updating a Project's Stage

**Request**

```
curl --location --request PATCH 'https://api.opensolar.com/api/orgs/:org_id/projects/:project_id/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data '{
    "workflow": {
        "active_stage_id": 433194,
        "workflow_id": 84617
    },
    "active_stage_id": 433194
}'
```

**Response**

```
{
  "id": 3763174,
  "identifier": "192984a9-3475-41a3-b136-8947588ac391",
  "org_id": 62854,
  "org": "https://api.opensolar.com/api/orgs/62854/",
  "simulate_first_year_only": false,
  "url": "https://api.opensolar.com/api/orgs/62854/projects/3763174/",
  "customer_proposal_data": null,
  "workflow": {
    "id": 3631398,
    "workflow_id": 84617,
    "active_stage_id": 433194
  },
  "custom_data": null
}
```

### Updating a Project's Energy Consumption

**Request**

```
curl --location --request PATCH 'https://api.opensolar.com/api/orgs/:org_id/projects/:project_id/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data '{
  "usage": {
    "usage_data_source": "kwh_annual",
    "values": 7314
  }
}'
```

#### Supported Usage Values

| Data Source | `usage_data_source` | `values` |
| --- | --- | --- |
| Annual Consumption (kWh) | `kwh_annual` | Integer ex. (`15000`) |
| Monthly Consumption (kWh) | `kwh_monthly` | List of 12 Integers ex. (`[100,101,102,103,104,105,106,107,108,109,110,115]`) |
| Bi-Monthly Consumption (kWh) | `kwh_every_second_month` | List of 6 Integers ex. (`[100, 101, 102, 103, 104, 105]`) |
| Quarterly Consumption (kWh) | `kwh_quarterly` | List of 4 Integers ex. (`[100, 101, 102, 103]`) |
| Daily Consumption (kWh) | `kwh_daily_per_month` | List of 12 Integers ex. (`[100,101,102,103,104,105,106,107,108,109,110,115]`) |
| Annual Bill | `bill_annual` | Integer ex. (`60000`) |
| Monthly Bills | `bill_monthly` | List of 12 Integers ex. (`[100,101,102,103,104,105,106,107,108,109,110,115]`) |
| Bi-Monthly Bills | `bill_every_second_month` | List of 6 Integers ex. (`[100, 101, 102, 103, 104, 105]`) |
| Quarterly Bills | `bill_quarterly` | List of 4 Integers ex. (`[100, 101, 102, 103]`) |
| Estimate (Low, Medium, High) | `estimate` | String. Can either be `Low`, `Medium`, or `High` |

> **Warning:**
>
> ## Deprecations
>
> The existing `stage` field is deprecated and now represents the project's workflow milestone id. See the table below for your reference.
>
> | Stage ID and phase | Milestone ID and phase |
> | --- | --- |
> | 0 - Designing | 0 - Presale |
> | 1 - Selling | 1 - Lock Pricing |
> | 2 - Installing | 2 - Sold |
> | 3 - Maintaining | 3 - Installed |
> | 4 - Other | 4 - Others |
>
> The project's current stage can be managed using the `workflow.active_stage_id` field.
