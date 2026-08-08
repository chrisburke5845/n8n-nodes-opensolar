# Proposal Data

This endpoint returns all the proposal data details used to generate an OpenSolar proposal — including system designs, pricing, energy output, panel placement, financial metrics, and more.

> **Warning:**
>
> This endpoint is only available to organisations with the **Raw Data API Access** product enabled. Requests without this product return **HTTP 402 Payment Required**. See [API Access Plans](api-access-plans.md) for details on how to enable it.

## URL and Method

- **GET** `/api/user_logins/` — Load proposal data for a project (by ID).

## Authentication

- **Required**: authenticated user.
- **Project access**: the user must have access to every requested project either:
  - as a **Pro** (role in the project's org), or
  - as a **Customer** (contact linked to the project).
- If any requested project is not accessible, the API returns **403 Permission Denied**.

## Query Parameters

| Parameter | Required | Description |
| --- | --- | --- |
| `project_ids` | Yes | The project ID (e.g. `123`). |
| `expo_enabled` | No | When set (e.g. `1`), includes expo-related content in the proposal data. |
| `compress_data` | No | When set (e.g. `1`, `true`, `y`), compresses large blobs in the response (e.g. bills, output, contract template) to reduce payload size. |
| `include_unsold` | No | When set to `1`, includes unsold systems in the proposal (otherwise only sold/system-restricted systems may be included depending on project state). |
| `language` | No | Language code for proposal content (e.g. `en`). Defaults to project language if not provided. |

## Response Structure

The response is a **JSON array of org objects**. For a single project request, there is typically **one org** with **one project** in its `projects` array.

### Org (top-level objects in the array)

Fields relevant to the Online Proposal:

| Field | Description |
| --- | --- |
| `id` | Org ID. |
| `url` | API URL of the org. |
| `country_iso2` | Country code (e.g. `AU`, `US`). |
| `user` | Current user summary (e.g. id, email, terms_accepted_date). |
| `projects` | Array of project objects (see below). |
| `logo_public_url` | URL of the org logo. |
| `name` | Org display name. |
| `sales_phone_number` | Sales contact phone. |
| `company_website` | Org website. |
| `about_content` | About / description content. |
| `color_highlight` | Highlight colour (e.g. for UI). |
| `enable_contracts_in_docusign` | Whether DocuSign contracts are enabled. |
| `disable_apply_now_prompt` | When true, disables the integrated finance "apply now" prompt in the Online Proposal. |
| `brighte_vendor_id` | Brighte integration vendor ID (if used). |
| `email_acceptance_files_enabled` | Whether email acceptance files are enabled. |
| `cashflow_is_active` | Whether cashflow approval/conditional approval is active. |

### Projects Array (each item under `org.projects`)

Fields that the Online Proposal uses (other project fields may be present but are omitted here for brevity):

| Field | Description |
| --- | --- |
| `id` | Project ID. |
| `url` | API URL of the project. |
| `identifier` | Project identifier. |
| `address`, `zip`, `state`, `locality`, `country`, `county` | Address fields. |
| `country_iso2` | Project country code. |
| `language` | Project language. |
| `contacts` | Array of contact objects (e.g. display, full_name, email, phone, id, url). |
| `assigned_role` | Role assigned to the project (e.g. schedule_meeting_url, schedule_meeting_label). |
| `usage` | Usage data (e.g. for bills and normalization). |
| `statement` | Statement / notes. |
| `system_sold`, `payment_option_sold` | References to the sold system and payment option (if any). |
| `simulate_first_year_only` | When true, only first-year calculations may be present in the response. |
| `testimonials` | Array of testimonial objects for the proposal. |
| `proposal_data` | Nested object containing the full proposal payload (see below). |
| `available_customer_actions` | Actions the customer can take (e.g. checkout, sign) per system/payment option; also duplicated inside `proposal_data`. |
| `change_orders` | Array of change order objects. |
| `custom_data` | Custom key/value data; e.g. `proposal_config_v2` for Proposal V2 template config. |
| `proposal_template_id` | ID of the proposal template. |
| `calculation_error_messages`, `last_calculation_error` | Calculation errors, if any. |
| `business_name` | Business name (for commercial projects). |
| `lat`, `lon` | Project coordinates (latitude and longitude). |
| `stage` | Project stage / workflow milestone ID. |
| `contract_date` | Date the contract was signed (if any). |
| `priority` | Project priority level. |
| `created_date`, `modified_date` | Timestamps for project creation and last modification. |
| `utility_tariff_current`, `utility_tariff_proposed` | Current and proposed utility tariff references. |
| `utility_tariff_current_custom`, `utility_tariff_proposed_custom` | Custom tariff overrides (if any). |
| `assigned_team_member` | Assigned team member details (display, email, phone, schedule_meeting_url, etc.). |
| `utility_tariff_or_guess`, `utility_tariff_proposed_or_guess` | Resolved tariff objects (actual or best-guess), including tariff data, rate structures, and metadata. |
| `usage_annual_or_guess` | Annual energy usage in kWh (actual or estimated). |
| `usage_normalized` | Normalized usage breakdown (annual, monthly, daily_per_month, curves, controlled loads). |
| `valid_until_date` | Proposal validity date. |
| `project_sold` | Date the project was sold (if any). |
| `original_system_sold` | Reference to the original sold system (before change orders). |
| `api_key_chat` | Chat API key (if configured). |
| `docusign_contract_auth_failures` | Count of DocuSign authentication failures. |
| `has_unsaved_data` | Present when the response was built from unsaved data. |

### proposal_data (used by the Online Proposal)

| Key | Description |
| --- | --- |
| `design` | System design data. Compressed (string) when `compress_data` is true; the client decompresses before use. See [Decompressing Design Data](projects.md#decompressing-design-data). |
| `systems` | Array of system objects. Each has a `data` object containing **bills**, **output**, and **payment_options** (and other keys). Treat `systems[].data` as the per-system proposal payload (bills, output, payment options, featured figures, etc.). Per-hour PV generation (when present) is under `systems[].data.output.hourly` — see [Hourly generation data](#hourly-generation-data). |
| `project` | Project data used for template rendering. |
| `org` | Org data used for template rendering. |
| `colors` | UI colours (e.g. highlightColor, textColor). |
| `proposal_template_settings` | Template configuration (sections, titles, next steps, etc.). |
| `contact`, `customer`, `contacts` | Primary contact and list of contacts (legacy and current keys). |
| `assigned_team_member` | Team member assigned to the project. |
| `available_customer_actions` | Same concept as on the project: actions per system/payment option. |
| `proposal_message` | Optional message body for the proposal. |
| `system_image_urls` | URLs for system/satellite images (e.g. used in Proposal V2). |
| `initiated_change_order` | When present, change order in progress (e.g. with `system_change_orders`, `change_order_template_content`). |
| `testimonials` | Testimonials for the proposal. |
| `country_iso2` | Country code for the proposal. |
| `address_over_two_lines` | Formatted address. |
| `assigned_role`, `assigned_installer_role`, `assigned_designer_role`, `assigned_salesperson_role` | Role snapshots. |
| `schedule_meeting_url`, `schedule_meeting_label` | Meeting scheduling link and label. |
| `language` | Proposal language. |
| `proposal_attachments`, `customer_acceptance`, `has_battery` | Attachments, acceptance config, and battery flag. |
| `current_system` | Existing/retrofit system data (inverters, batteries, others, output, kw_stc). Present when the project has an existing system. |
| `tax_name` | Tax label for the project's country (e.g. `GST`, `Tax`). |
| `contact_details` | Contact details for the assigned team member (same shape as `assigned_team_member`). |
| `is_pdf_proposal` | Whether this proposal data was generated for PDF export. |
| `is_lite_report` | Whether this is a lite report. |
| `is_retrofit_project` | Whether the project is a retrofit (existing system being upgraded). |
| `show_contract_header` | Whether to show the contract header in the proposal. |
| `online_proposal_auto_login_url` | Auto-login URL for the online proposal. |
| `share_link_qrcode` | Base64-encoded QR code image for the proposal share link. |
| `system_image_html`, `system_performance_html` | Pre-rendered HTML snippets for system images and performance summary. |
| `pdf_attachments` | Attachments included in PDF proposal export. |

> **Note:**
>
> This document does not enumerate every nested field inside `systems[].data` (e.g. full bill breakdowns or every payment_option property). For **hourly generation**, see [Hourly generation data](#hourly-generation-data). For other implementation details, see the backend `prepare_proposal_data_direct` and the frontend `parseDataToState` / `prepareProposalData` and proposal types in the SPA.

## Common Use Cases

### Cost and Price Breakdown

Extract detailed cost breakdowns to feed into your own reporting or ERP systems:

```
for system in proposal_data["systems"]:
    pricing = system["data"].get("pricing", {})
    line_items = system["data"].get("line_items", [])
    payment_options = system["data"].get("payment_options", [])
```

### Energy Production Forecasting

Access detailed production data for monitoring or benchmarking:

```
for system in proposal_data["systems"]:
    annual_output = system.get("systemOutputAnnualkWh")
    monthly_output = json.loads(system.get("output_monthly_json", "[]"))
    shading = system.get("data", {}).get("shadingByPanelGroup", [])
```

For **8760-hour** (typical) per-system production series, read `system["data"].get("output", {}).get("hourly")` when `output` is a dict (if `compress_data` was used, decompress `output` first). See [Hourly generation data](#hourly-generation-data).

### Financial Analysis

Pull financial metrics for portfolio-level analysis or CRM integration:

```
for system in proposal_data["systems"]:
    payback = system.get("systemPaybackYear")
    npv = system.get("systemNetPresentValue")
    irr = system.get("systemIrr")
    roi = system.get("systemReturnOnInvestment")
```

## Example

### Retrieving Proposal Data for a Project

**Request**

```
curl "https://api.opensolar.com/api/user_logins/?project_ids=:project_id" \
  --header "Authorization: Bearer <token>"
```

**Response (abbreviated)**

```
[
  {
    "id": 62854,
    "url": "https://api.opensolar.com/api/orgs/62854/",
    "country_iso2": "AU",
    "user": {
      "id": 1,
      "email": "admin@example.com",
      "terms_accepted_date": "2021-08-17T03:42:29.573988Z",
      "is_anonymous_share_user": false
    },
    "name": "Demo Solar Co.",
    "logo_public_url": "https://api.opensolar.com/media/logos/demo.png",
    "sales_phone_number": "1300 000 000",
    "company_website": "https://example.com",
    "about_content": "...",
    "color_highlight": "#FF6600",
    "enable_contracts_in_docusign": true,
    "disable_apply_now_prompt": false,
    "brighte_vendor_id": null,
    "email_acceptance_files_enabled": false,
    "cashflow_is_active": true,
    "projects": [
      {
        "id": 3763174,
        "url": "https://api.opensolar.com/api/orgs/62854/projects/3763174/",
        "identifier": "4007c165-ec25-4c02-ae94-5746c0e22a64",
        "business_name": null,
        "address": "6 Hopetoun Ave",
        "zip": "2030",
        "state": "NSW",
        "locality": "Vaucluse",
        "country": "https://api.opensolar.com/api/countries/14/",
        "county": null,
        "stage": 0,
        "country_iso2": "AU",
        "lat": -33.858,
        "lon": 151.275,
        "language": "en",
        "contacts": [
          {
            "display": "George Costanza",
            "full_name": "George Costanza",
            "first_name": "George",
            "family_name": "Costanza",
            "email": "gcostanza@example.com",
            "phone": "0400000000",
            "id": 14561,
            "url": "https://api.opensolar.com/api/orgs/62854/contacts/14561/"
          }
        ],
        "assigned_role": null,
        "created_date": "2024-01-31T00:58:18.186310Z",
        "modified_date": "2024-02-12T01:18:20.475934Z",
        "usage": "...",
        "assigned_team_member": {
          "id": 101776,
          "display": "Bob Company",
          "email": "bob@example.com",
          "schedule_meeting_url": "https://calendly.com/bob/meeting",
          "schedule_meeting_label": "Schedule a time to discuss!"
        },
        "utility_tariff_or_guess": {...},
        "utility_tariff_proposed_or_guess": {...},
        "usage_annual_or_guess": 7300,
        "usage_normalized": {...},
        "statement": null,
        "system_sold": null,
        "payment_option_sold": null,
        "simulate_first_year_only": false,
        "last_calculation_error": null,
        "calculation_error_messages": [],
        "valid_until_date": "2024-02-23",
        "change_orders": [],
        "custom_data": null,
        "proposal_template_id": null,
        "testimonials": [...],
        "has_unsaved_data": false,
        "available_customer_actions": [...],
        "proposal_data": {
          "available_customer_actions": [...],
          "colors": {
            "textColor": "#333333",
            "highlightColor": "#FF6600",
            "highlightColorLight": "...",
            "highlightColorInteraction": "...",
            "textColorOnHighlight": "#FFFFFF"
          },
          "address_over_two_lines": ["6 Hopetoun Ave", "Vaucluse NSW 2030"],
          "project": {...},
          "org": {...},
          "assigned_role": null,
          "assigned_installer_role": null,
          "assigned_designer_role": null,
          "assigned_salesperson_role": null,
          "contact": {...},
          "customer": {...},
          "contacts": [...],
          "assigned_team_member": {...},
          "contact_details": {...},
          "design": "<base64-encoded gzip string>",
          "current_system": {
            "is_retrofit_system": false,
            "inverters": [...],
            "batteries": [...],
            "others": [...],
            "output": {...},
            "kw_stc": 0
          },
          "systems": [
            {
              "title": "System 1 (6.21 kW)",
              "name": "System 1",
              "has_battery": false,
              "battery_total_kwh": 0,
              "systemKwStc": "6.210",
              "systemOutputAnnualkWh": "8,547",
              "systemPaybackYear": "4.2",
              "systemNetPresentValue": "$12,340",
              "systemIrr": "...",
              "systemReturnOnInvestment": "...",
              "panelOrientations": "18 panels facing North at 20°",
              "systemPanelPlacement": "18 x LG345N1C-V5 (portrait)",
              "moduleCodes": "LG345N1C-V5",
              "inverterCodes": "Fronius Primo 5.0-1",
              "batteryCodes": "",
              "image_url": "https://...",
              "output_monthly_json": "[680, 720, ...]",
              "energy_consumption_daily_per_month_json": "[23.5, 26.0, ...]",
              "data": {
                "pricing": {...},
                "line_items": [...],
                "payment_options": [...],
                "module": {...},
                "inverters": [...],
                "batteries": [...],
                "output": "...",
                "consumption": {...},
                "bills": "...",
                "site": {...},
                "moduleTypes": [...],
                "environmentals": {...},
                "system_panel_orientation_table": "...",
                "tax_name": "GST"
              }
            }
          ],
          "has_battery": false,
          "proposal_template_settings": {...},
          "country_iso2": "AU",
          "tax_name": "GST",
          "testimonials": [...],
          "customer_acceptance": null,
          "proposal_attachments": [],
          "schedule_meeting_url": null,
          "schedule_meeting_label": "Schedule a time to discuss!",
          "language": "en",
          "proposal_message": "...",
          "system_image_urls": [...],
          "system_image_html": "...",
          "system_performance_html": "...",
          "online_proposal_auto_login_url": "...",
          "share_link_qrcode": "<base64-encoded image>",
          "is_pdf_proposal": false,
          "is_lite_report": false,
          "is_retrofit_project": false,
          "show_contract_header": true,
          "initiated_change_order": null,
          "pdf_attachments": []
        }
      }
    ]
  }
]
```

## Hourly generation data

Per-system **hourly PV generation** lives under each system’s **`data`** object (not `systems[].output`). Canonical path:

`response[org].projects[project].proposal_data.systems[system].data.output.hourly`

For one org and one project that is often `response[0].projects[0].proposal_data.systems[i].data.output.hourly`. Iterate **`proposal_data.systems`** when there are multiple systems (order follows design **`order`**).

**What it is:** `hourly` is part of `data.output`, populated when performance calcs store an hourly series (e.g. PVWatts-style). It is often a **8760**-element array (non–leap year); it may be **missing**, **null**, or another length if calcs are incomplete—validate before assuming a full year. Values are typically treated as **kWh per hour**.

**`compress_data`:** When this query param is set, `systems[].data.output` may be a **compressed string** of the full output object. **Decompress and JSON-parse** it, then read `hourly`. (`proposal_data.design` is also compressed in that mode; see [Decompressing Design Data](projects.md#decompressing-design-data).)

**Other params:** **`include_unsold`** changes which systems appear in `proposal_data.systems`. Identify systems with **`systems[i].data`** fields such as **`uuid`** and **`name`** when present.

**Quick access:** After GET `/api/user_logins/?project_ids=…`, walk orgs → `projects` → `proposal_data` → `systems`, then `system.data.output.hourly` when `output` is a plain object.

```
const systems = data?.[0]?.projects?.[0]?.proposal_data?.systems ?? [];
systems.map((s) => s?.data?.output?.hourly);
```

## Rate Limits

See [Throttle Limits](throttle.md) for details on rate limits for this and other endpoints.
