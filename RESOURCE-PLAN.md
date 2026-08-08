# OpenSolar API — Resource Plan

Planning document only — no node code yet. Derived from a full read of every file in `docs/opensolar-api/` (52 files). Base URL: `https://api.opensolar.com`. Every endpoint below requires `Authorization: Bearer <token>` and (except the few explicitly noted) is scoped under `/api/orgs/:org_id/...`.

## Plan legend

Per `api-access-plans.md` and `api-access-faqs.md`, there are two paid tiers: **API Access** and **Raw Data API Access** (Raw Data is a superset — it includes everything in API Access plus full design/proposal data). From **17 March** access requires one of these (30-day free trial available).

- ✅ **API Access** — works fully on the standard plan
- ⚠️ **API Access (reduced)** — works on standard plan, but response omits some fields; full response needs Raw Data
- 🔒 **Raw Data only** — the endpoint itself is blocked (HTTP 402) without Raw Data API Access
- ❔ **Not addressed in docs** — the access-plans/FAQ pages don't mention this endpoint; presumed standard API Access but not confirmed

---

## 1. Projects & Systems

### Projects
Core project entity — design, contacts, workflow, pricing, files, etc. (`projects.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| List Projects | `GET /api/orgs/:org_id/projects/` | ✅ | Query: `page`, `limit`, `fieldset` (`list`, `studio`) |
| Get Project | `GET /api/orgs/:org_id/projects/:id/` | ⚠️ | `design` field (compressed design data) omitted/null on API Access; populated on Raw Data |
| Create Project | `POST /api/orgs/:org_id/projects/` | ✅ | Throttled 10/min per user, 10,000/day per org |
| Update Project | `PUT /api/orgs/:org_id/projects/:id/` | ✅ | Also used for: assigning roles, updating `usage` (energy consumption), sharing to a connected org (`shared_with`, see §7) |
| Update Project (partial) | `PATCH /api/orgs/:org_id/projects/:id/` | ✅ | Docs show PATCH used for workflow/stage updates |
| Delete Project | `DELETE /api/orgs/:org_id/projects/:id/` | ✅ | |

Already implemented in `nodes/OpenSolar`: **List** and **Get**.

### Systems
Read-only per docs — no create/update/delete endpoint documented. A system is created as part of a project's design, not directly via this API. (`system.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| List Systems | `GET /api/orgs/:org_id/systems/` | ✅ | `fieldset=list` **required**; also `page`, `limit`, `project` (filter by project id) |
| Get System | `GET /api/orgs/:org_id/systems/:id/` | ✅ | `fieldset=list` **required** |

### System Details
Design-related data (hardware, adders, incentives, module layout) per system in a project. (`system-details.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| Get System Details | `GET /api/orgs/:org_id/projects/:project_id/systems/details/` | ⚠️ | API Access omits `custom_data`; Raw Data returns full response. Query: `limit_to_sold`, `include_parts`, `exclude_parts` (mutually exclusive). Only works for projects owned by the org (not projects shared to you via Teams). Known to time out on large projects. |

### System Image
Generates (or re-generates on design change) and returns a rendered system image. (`system-image.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| Get System Image | `GET /api/orgs/:org_id/projects/:project_id/systems/:uuid/image/` | ❔ | `width` and `height` required. Follows redirects until the image is returned; first call generates a Private File attached to the project. |

### Generating Project Files
On-demand document generation (proposal, contract, reports, BOMs, etc.). (`generating-project-files.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| Generate Document (recommended) | `POST /api/orgs/:org_id/projects/:project_id/generate_document/:document_type/` | ❔ | ~19 PDF doc types (`proposal`, `contract`, `owners_manual`, `shade_report`, etc.) + 3 CSV doc types. Query: `file_format`, `document_template_id`, `system_uuid`, `payment_option_id`, `language`, `file_tags`, `action=save`, `temporary` |
| Generate PDF (legacy) | `POST /api/orgs/:org_id/projects/:project_id/generate_document_pdf/:document_type/` | ❔ | Legacy alias of the above for PDF output |
| Generate DOCX | `POST /api/orgs/:org_id/projects/:project_id/generate_document_docx/:document_type/` | ❔ | |

Only the recommended `generate_document` endpoint is implemented in `nodes/OpenSolar` — see `resources/generateDocument/` (single "Generate" operation). The legacy PDF alias and the DOCX endpoint are intentionally not built (recommended endpoint covers PDF and CSV via `file_format`; DOCX isn't part of the recommended flow per the docs). The Document Type dropdown lists all 21 unique `document_type` values from the docs' combined PDF/CSV tables (`financials_report` appears once, since it's the same document type in both tables, distinguished only by the `file_format` param). Response handling always requests `arraybuffer`/binary output (matching the precedent set by System Image, the other "generate/render and return a file" resource in this node) since the response shape genuinely varies by flow (raw file bytes vs. a JSON Private File reference when `action=save`) — a notice on the field explains the JSON case needs parsing out of the binary.

### Proposal Data
Full data behind an OpenSolar proposal — pricing, output, panel placement, financials. (`proposal-data.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| Get Proposal Data | `GET /api/user_logins/` | 🔒 | **Not** org-scoped (top-level path). Required query: `project_ids`. Optional: `expo_enabled`, `compress_data`, `include_unsold`, `language`. Returns HTTP 402 without Raw Data API Access. Throttled 100/min per user. |

Implemented in `nodes/OpenSolar` as its own resource — see `resources/proposalData/` (single "Get" operation). Unlike every other resource in this node, it has no Org ID field: the endpoint is genuinely top-level (`/api/user_logins/`), not `/api/orgs/:org_id/...`, and the credential's generic bearer-header auth applies regardless of path. A dedicated `handleProposalDataResponse` (in `shared/errors.ts`) intercepts HTTP 402 and throws a specific `NodeApiError` pointing at Raw Data API Access, rather than surfacing OpenSolar's generic 402 body — the request uses `ignoreHttpStatusErrors: true` so this handler gets a chance to run before n8n's default HTTP-error behavior would otherwise fire.

---

## 2. Contacts & Roles

### Contacts
Customer/individual contact records, optionally linked to a MyEnergy user login. (`contacts.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| List Contacts | `GET /api/orgs/:org_id/contacts/` | ✅ | Query: `page`, `limit` |
| Get Contact | `GET /api/orgs/:org_id/contacts/:id/` | ✅ | |
| Create Contact | `POST /api/orgs/:org_id/contacts/` | ✅ | |
| Update Contact | `PUT /api/orgs/:org_id/contacts/:id/` | ✅ | |
| Delete Contact | `DELETE /api/orgs/:org_id/contacts/:id/` | ✅ | |

### Roles
A user's role/membership within an org. Read-only per docs — no create/update/delete endpoint documented. (`roles.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| List Roles | `GET /api/orgs/:org_id/roles/` | ❔ | |
| Get Role | `GET /api/orgs/:org_id/roles/:id/` | ❔ | Query: `fieldset=list`, `range`, `page`, `limit`, `ordering` (`id`, `is_admin`) |

---

## 3. Org & Configuration

### Orgs
The org itself — top-level container for everything. (`orgs.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| Get Org | `GET /api/orgs/:org_id/` | ✅ | Used today as the credential test endpoint's neighbor (`/api/fetch_token/`) |
| Update Org | `PUT /api/orgs/:org_id/` | ✅ | |

No documented "list my orgs" endpoint — org_id must be known/entered by the user (already reflected in the current node as a plain required field, not a dropdown).

### Workflows
Customizable project stages/actions (`workflow_stages`, each with an `actions` array). (`workflows.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| List Workflows | `GET /api/orgs/:org_id/workflows/` | ❔ | Query: `page`, `limit`, `is_default`, `is_archived` |
| Get Workflow | `GET /api/orgs/:org_id/workflows/:id/` | ❔ | |
| Create Workflow | `POST /api/orgs/:org_id/workflows/` | ❔ | |
| Update Workflow | `PUT /api/orgs/:org_id/workflows/:id/` | ❔ | Whole-entity PUT — must resend all stages/actions you want to keep. New actions use `id: "newAction-<n>"`. |
| Delete Workflow | `DELETE /api/orgs/:org_id/workflows/:id/` | ❔ | |

### Costing
Cost-configuration presets (per-system/per-panel/per-watt cost breakdowns). (`costing.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| List Costings | `GET /api/orgs/:org_id/costings/` | ❔ | Query: `page`, `limit`, `priority` |
| Get Costing | `GET /api/orgs/:org_id/costings/:id/` | ❔ | |
| Create Costing | `POST /api/orgs/:org_id/costings/` | ❔ | **Verified live 2026-08-08**: the docs' `POST .../costings/:id` row is wrong. Real routing is standard DRF: list route `allow: GET, POST, HEAD, OPTIONS`; detail route `allow: GET, PUT, PATCH, DELETE, HEAD, OPTIONS` (POST to a detail id returns `405 Method Not Allowed`). Plain POST to the list endpoint returns `201` with the created object. See `scripts/verify-costing-post-pattern.sh`. |
| Update Costing | `PUT`/`PATCH /api/orgs/:org_id/costings/:id/` | ❔ | Standard update, not POST — see verification note above |
| Delete Costing | `DELETE /api/orgs/:org_id/costings/:id/` | ❔ | |

Fully implemented in `nodes/OpenSolar` (List, Get, Create, Update via PATCH, Delete). Given the ~200-field schema, Create/Update expose a handful of curated fields (title, description, priority, is_archived) plus a JSON catch-all merged into the body — see `resources/costing/` and `shared/transport.ts`'s `mergeFieldsCollectionWithJson`.

### Payment Options
Financing/payment products (cash, loan, PPA, lease, etc.). (`payment-options.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| List Payment Options | `GET /api/orgs/:org_id/payment_options/` | ❔ | Query: `page`, `limit`, `priority`, `auto_apply_enabled`, `payment_type` (`cash`, `loan`, `loan_advanced`, `ppa`, `regular_payment`, `lease`) |
| Get Payment Option | `GET /api/orgs/:org_id/payment_options/:id/` | ❔ | |
| Create Payment Option | `POST /api/orgs/:org_id/payment_options/` | ❔ | **Verified live 2026-08-08**: step 3 (POST to a fabricated `:id`) returned a clean `405 Method Not Allowed` with `allow: GET, PUT, PATCH, DELETE, HEAD, OPTIONS` — same routing fix as Costing confirmed. Step 2 (POST to the plain list endpoint) returned `500` rather than a clean `201`, most likely because our generic test payload didn't satisfy a required field (e.g. `payment_type`) and their server-side validation doesn't handle that gracefully — the `Allow` header is still authoritative for routing regardless. |
| Update Payment Option | `PUT`/`PATCH /api/orgs/:org_id/payment_options/:id/` | ❔ | Standard update, not POST — see verification note above |
| Delete Payment Option | `DELETE /api/orgs/:org_id/payment_options/:id/` | ❔ | |

Fully implemented in `nodes/OpenSolar` (List, Get, Create, Update via PATCH, Delete) — see `resources/paymentOption/`.

### Pricing Schemes
Pricing formulas (markup %, price/watt, price/watt by size, fixed price). (`pricing-schemes.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| List Pricing Schemes | `GET /api/orgs/:org_id/pricing_schemes/` | ❔ | Query: `page`, `limit`, `priority`, `auto_apply_enabled`, `pricing_formula` |
| Get Pricing Scheme | `GET /api/orgs/:org_id/pricing_schemes/:id/` | ❔ | |
| Create Pricing Scheme | `POST /api/orgs/:org_id/pricing_schemes/` | ❔ | **Verified live 2026-08-08**: same result pattern as Payment Options — step 3 gave a clean `405`/`allow: GET, PUT, PATCH, DELETE, HEAD, OPTIONS` confirming the routing fix; step 2 gave `500` (likely missing `pricing_formula` in our generic test payload, not a routing problem). |
| Update Pricing Scheme | `PUT`/`PATCH /api/orgs/:org_id/pricing_schemes/:id/` | ❔ | Standard update, not POST — see verification note above |
| Delete Pricing Scheme | `DELETE /api/orgs/:org_id/pricing_schemes/:id/` | ❔ | |

Fully implemented in `nodes/OpenSolar` (List, Get, Create, Update via PATCH, Delete) — see `resources/pricingScheme/`. Note: `pricing_formula` is exposed as free text, not a locked dropdown — the docs' own example response uses a value ("Price Per Module/Inverter/Battery") not present in the docs' own documented filter enum.

---

## 4. Hardware / Component Activations

Four parallel resources — "activations" of hardware components (from OpenSolar's component database) into an org's catalog. Same shape/operations for each. (`modules.md`, `inverters.md`, `batteries.md`, `other-components.md`)

| Resource | List | Create | Get/Update/Delete (`:id`) | Plan |
| --- | --- | --- | --- | --- |
| Modules | `GET /api/orgs/:org_id/component_module_activations/` (`page`, `limit`) | `POST /api/orgs/:org_id/component_module_activations/` | `GET`/`PUT`/`PATCH`/`DELETE` `/api/orgs/:org_id/component_module_activations/:id/` | ❔ |
| Inverters | `GET /api/orgs/:org_id/component_inverter_activations/` (`page`, `limit`) | `POST /api/orgs/:org_id/component_inverter_activations/` | `GET`/`PUT`/`PATCH`/`DELETE` `/api/orgs/:org_id/component_inverter_activations/:id/` | ❔ |
| Batteries | `GET /api/orgs/:org_id/component_battery_activations/` (`page`, `limit`) | `POST /api/orgs/:org_id/component_battery_activations/` | `GET`/`PUT`/`PATCH`/`DELETE` `/api/orgs/:org_id/component_battery_activations/:id/` | ❔ |
| Other Components | `GET /api/orgs/:org_id/component_other_activations/` (`page`, `limit`) | `POST /api/orgs/:org_id/component_other_activations/` | `GET`/`PUT`/`PATCH`/`DELETE` `/api/orgs/:org_id/component_other_activations/:id/` | ❔ |

**Verified live 2026-08-08 for Modules** (`scripts/verify-costing-post-pattern.sh RESOURCE_PATH=component_module_activations`): step 2 (POST to the plain list endpoint) returned a clean `400` with a precise validation message (`"Module must be selected from the database if not specifying custom module"`) — stronger confirmation than even a `201` would give, since it proves the endpoint properly parses and validates POST bodies rather than just routing them somewhere that happens to error. Step 3 gave the same clean `405`/`allow: GET, PUT, PATCH, DELETE, HEAD, OPTIONS` as every other resource tested. Per the "identical in shape" framing in the docs, the same fix was applied to Inverters, Batteries, and Other Components without individually re-running the script.

Fully implemented in `nodes/OpenSolar` via a shared factory (`shared/componentActivation.ts`'s `buildComponentActivationDescription`) parameterized per resource — see `resources/moduleActivation/`, `resources/inverterActivation/`, `resources/batteryActivation/`, `resources/otherComponentActivation/`. Other Components is the one exception in shape: its catalog reference field (`other`) is optional, not required — `other-components.md`'s own example shows `"other": null` as a normal, valid state (a custom/manual entry rather than a catalog reference), unlike Modules/Inverters/Batteries where the catalog reference is required.

---

## 5. Files

### Private Files
Org/project file attachments — the most fully documented CRUD resource outside Projects/Contacts. (`private-files.md`)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| List Private Files | `GET /api/orgs/:org_id/private_files/` | ✅ | Filters: `project`, `user_id`, `file_tags`, `file_tags_exclude`, `search`, `ordering` (default `-modified_date`) |
| Get Private File | `GET /api/orgs/:org_id/private_files/:file_id/` | ✅ | `file_contents` download URL expires after 1 hour |
| Create Private File | `POST /api/orgs/:org_id/private_files/` | ✅ | `multipart/form-data`; requires Pro role in org. Throttle: 1000/day per org, 1000/hour per user |
| Update Private File | `PATCH /api/orgs/:org_id/private_files/:file_id/` | ✅ | |
| Delete Private File | `DELETE /api/orgs/:org_id/private_files/:file_id/` | ✅ | |

### File Tags
Not an API resource with its own endpoint — a fixed reference list of ~50 tag titles (`AC Disconnect Location`, `Site Model`, `Sales Proposal`, etc.) used as values for the `file_tags` filter on Private Files. (`file-tags.md`) No node action needed beyond maybe an options list for the Private Files filter field.

---

## 6. Reference / Lookup Tables

Static ID→label lookups, not endpoints. Useful as `options` dropdowns wherever a project/system field references them (e.g. `roof_type`, event `event_type_id`).

| Table | Source | Size |
| --- | --- | --- |
| Event Types | `events.md` | ~80 entries (e.g. `0` = Email Invitation Sent, `103` = Project Marked as Sold) |
| Roof Types | `roof-types.md` | 19 entries (e.g. `6` = Composition/Asphalt Shingle, `20` = Tile Concrete) |

---

## 7. Teams (Connected Orgs / Sharing)

Cross-org collaboration: connecting two orgs, sharing projects/entities between them, and constraining partner access. Admin-only to establish/manage connections; any user with project access can use sharing once connected. (`teams-overview.md` + 9 related files)

### Connected Orgs

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| Create Connection Request | `POST /api/orgs/:org_id/connected_orgs/` | ❔ | Body: `org_name` (exact match), `notify_roles`, optional `is_active`, `permission`. Throttle: 100/day (both per-user and per-org) |
| List Connections | `GET /api/orgs/:org_id/connected_orgs/` | ❔ | Standard list params: `fieldset=list`, `limit`, `ordering`, `page`, `range`. Throttle 100/day |
| List Pending Requests | `GET /api/orgs/:org_id/connected_orgs/pending/` | ❔ | Returns items with `org_from_id`, `org_from_name`, `org_to_id` |
| Accept Pending Request | `POST /api/orgs/:org_id/connected_orgs/accept_connection/` | ❔ | Body: `{ "org_to_id": <id> }` |
| Enable/Disable Connection | `PATCH /api/orgs/:org_id/connected_orgs/:connection_id/` | ❔ | Body: `{ "is_active": true/false }`. Disabling blocks all sharing both directions but keeps the connection |
| Delete Connection | `DELETE /api/orgs/:org_id/connected_orgs/:connection_id/` | ❔ | Removes all sharing settings permanently |

Fully implemented in `nodes/OpenSolar` — see `resources/connectedOrg/` (operations: Create Connection Request, Get Many, List Pending Requests, Accept Pending Request, Enable/Disable Connection (`update`), Delete). The list operation is labeled "Get Many" in the UI, matching the `getAll`-operation naming convention used by every other resource in this node, rather than "List Connections".

### Custom Permissions for Teams

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| Create Permission Role | `POST /api/orgs/:org_id/permissions_role/` | ❔ | Body: `role_type: 1` (distinguishes from normal user roles, `role_type: 0`), plus a `permissions` JSON blob (per-section view/create/edit/delete flags). No GET/PUT/DELETE documented for this endpoint. |

Implemented in `nodes/OpenSolar` as its own resource (Create only) — see `resources/permissionRole/`. `role_type` is sent as a fixed hidden field; `permissions` is passed through as a raw JSON-encoded string (not parsed), matching the API's expectation of a string-typed field per `custom-permission-for-teams.md`.

### Sharing (not separate resources — extensions of existing endpoints)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| Share/Unshare a Project | `PUT /api/orgs/:org_id/projects/:project_id/` | ❔ | Set `shared_with: [{ org_id, permission, is_shared }]` — this is just Update Project (§1) with a specific field |
| Bulk Share/Unshare Entities | `PUT /api/orgs/:org_id/bulk/:entity_type/` | ❔ | `entity_type` ∈ pricing_schemes, costings, adders, payment_options, actions, component_module_activations, component_inverter_activations, component_battery_activations, component_other_activations, project_configurations, battery_schemes, proposal_templates, contracts, testimonials, incentives, document_templates. Body: `share_with_ids`, `unshare_with_ids`, `resource` (= entity_type), `ids` |

Share/Unshare a Project is implemented as a new "Share/Unshare" operation on the existing Projects resource (`resources/project/share.ts`), reusing Update Project's PUT routing and throttle-aware error handling. Bulk Share/Unshare Entities is implemented as its own resource, `resources/bulkShare/` — a single "Share/Unshare" operation with an Entity Type dropdown covering all 16 documented values.

### Accessing Shared Data (filter params, not endpoints)

Once shared, projects/entities appear in the normal list endpoints with extra filters (only usable with `fieldset=list`):
- Projects: `owner_org_id`, `visible_to`
- Other entities: `owned_by`, `shared_with`

---

## 8. Webhooks

Event-driven push notifications for 5 models: **Project, Contact, Event, Quote, QuoteActivityLog**. (`webhooks.md`, `webhooks-structure.md`, + per-model payload docs)

### Webhook Configuration

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| List Webhooks | `GET /api/orgs/:org_id/webhooks/` | ✅ | |
| Create Webhook | `POST /api/orgs/:org_id/webhooks/` | ✅ | Body: `endpoint`, `enabled`, `debug`, `trigger_fields`, `payload_fields` (blank → documented defaults on create) |
| Update Webhook | `PATCH /api/orgs/:org_id/webhooks/:id` | ✅ | Same body fields; blank on an existing webhook = `null`, not "use default" |

No DELETE documented for webhooks themselves.

The webhook config CRUD above (List/Create/Update) is implemented as the `webhook` resource in `nodes/OpenSolar`, for managing webhook registrations directly. Separately, `nodes/OpenSolarTrigger/OpenSolarTrigger.node.ts` is a proper n8n **Trigger** node (`webhookMethods.checkExists/create/delete`) that self-registers on activation: a Models multi-select (Project/Contact/Event/Quote/QuoteActivityLog) maps to `trigger_fields`/`payload_fields` as `["<model>.*", ...]`, `create` POSTs to `.../webhooks/` with `endpoint` set to n8n's dynamic webhook URL, and — since there's no documented DELETE — `delete` PATCHes `enabled: false` on the matching webhook instead of removing it (noted in the node's UI so it's not a surprise that a "deleted" trigger leaves a disabled row behind in OpenSolar). `checkExists` always re-derives the webhook's id by GETting the list and matching on `endpoint` (there's no GET-by-id), rather than trusting a previously-stored id; `create` uses that to PATCH-reenable a previously-disabled match (e.g. after editing an active trigger's Models and saving) instead of creating a duplicate row for the same URL.

### Webhook Queue & Logs (observability, read-only)

| Operation | Method & Endpoint | Plan | Notes |
| --- | --- | --- | --- |
| List Queued Webhooks | `GET /api/orgs/:org_id/webhook_queue_models/` | ❔ | Add `?format=csv` for CSV |
| List Webhook Process Logs | `GET /api/orgs/:org_id/webhook_process_logs/` | ❔ | `limit`, `page` (empty page → 500 error), `search`. Add `?format=csv` for CSV |

### Webhook Payload Models (reference — not endpoints)

Each payload has a common envelope (`timestamp`, `model`, `model_id`, `identifier`, `event`: CREATE/UPDATE/DELETE, `event_id`, `fields`). Model-specific notes:

| Model | Notes |
| --- | --- |
| Project | `design` field only present with Raw Data API Access |
| Contact | Standard contact fields |
| Event | Standard event fields (`event_type_id` references the Event Types lookup, §6) |
| Quote | Supplier quote (line items, pricing, delivery, status). CREATE/UPDATE/DELETE |
| QuoteActivityLog | Messages/files/system events on a quote. CREATE/DELETE only — immutable, never UPDATE |

---

## 9. Authentication (not org-scoped resources, but API endpoints)

Already implemented via `credentials/OpenSolarApi.credentials.ts`. Listed here for completeness. (`getting-bearer-tokens.md`, `using-bearer-tokens.md`, `how-to-set-machine-user.md`)

| Operation | Method & Endpoint | Notes |
| --- | --- | --- |
| Get Token (email/password) | `POST /api-token-auth/` | Body: `username`, `password`, optional `token` (MFA code) |
| Fetch/Refresh Token (existing session) | `GET /api/fetch_token/` | Optional `org_id` query param. Currently used as the credential test request. |
| Set/Unset Machine User | `PATCH /auth/users/:user_id/` | Body: `{ "is_machine_user": true/false }`. Machine users' tokens never expire (standard tokens expire after 7 days) |

---

## Notes for review

1. **The `:id`-on-POST pattern** — ~~looks like it could be a docs typo~~ **confirmed wrong for all six affected resources** via live tests against a real org on 2026-08-08 (`scripts/verify-costing-post-pattern.sh`, parameterized by `RESOURCE_PATH`): Costing, Payment Options, and Pricing Schemes all returned a clean `405 Method Not Allowed` (`allow: GET, PUT, PATCH, DELETE, HEAD, OPTIONS`, POST never listed) when POSTing to a detail `:id` URL; Modules returned the same `405`, and its plain-list POST returned a precise `400` validation error confirming the create path works properly. Inverters/Batteries/Other Components weren't individually re-tested (per their "identical in shape" documentation to Modules) but got the same routing fix. Real shape everywhere: POST-to-list creates, PUT/PATCH-to-`:id` updates. All six now fully implemented in `nodes/OpenSolar` — see §3/§4 above for per-resource notes.
2. **Plan-gating is only explicitly documented for 7 endpoints** (the `api-access-faqs.md` table): Contacts, Projects list, Project Details, Systems, System Details, Private Files, Proposal Data, Webhooks. Everything else marked ❔ above is presumably included in standard API Access (nothing in the docs suggests otherwise) but isn't called out one way or the other — flagging so we don't assert something the docs don't actually say.
3. **Proposal Data (`/api/user_logins/`) is the only endpoint that outright requires Raw Data API Access** (HTTP 402 otherwise) — everything else on API Access either works fully or works with reduced fields.
4. **Roles and Systems are read-only per docs** — no create/update/delete documented. Same for Webhook Queue/Logs and the two reference lookup tables.
5. **No "list my orgs" endpoint exists** anywhere in the docs — confirmed again while reading Orgs, Connected Orgs, and Proposal Data. Org ID stays a manual field, not a searchable dropdown, for any resource.
6. ~~Given how much of this (§3, §4, §7) shares the same CRUD shape, those are good candidates for a shared `resources/*` helper pattern once we start building, rather than repeating the same routing boilerplate six-plus times.~~ Done for §4: `shared/componentActivation.ts` generates the full resource description (operation dropdown, id field, pagination, Create/Update fields) from a small per-resource config, used by all four Hardware Activation resources. Also extracted `shared/pagination.ts` (Return All/Limit, used by every Get Many operation in the node) and `shared/transport.ts`'s `mergeFieldsCollectionWithJson` (named fields + JSON catch-all merged into a request body, used by Costing and ready for reuse). §7 (Teams) is now built too, though its three resources (Connected Orgs, Permission Role, Bulk Share) turned out different enough in shape (a status-transition RPC endpoint, a single-op create-only resource, an entity-type-parameterized URL) that no shared factory was warranted — each is a plain per-resource `index.ts` like §1–§3's simpler resources.

## Suggested build order (for discussion, not decided)

1. **Projects** (done: List, Get) → add Create/Update/Delete
2. **Contacts** — same CRUD shape as Projects, high value for CRM-sync use cases
3. **Private Files** — most-documented file resource, needed for document workflows
4. **Systems / System Details** — read-only, natural pairing with Projects
5. **Webhooks** (config) — enables event-driven workflows, a core n8n use case
6. Pricing/Costing/Payment Options, Hardware activations, Workflows, Roles, Teams, Proposal Data, Generating Project Files — roughly in decreasing order of general utility, pending your priorities
