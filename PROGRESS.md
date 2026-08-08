# Progress Log

[2026-08-08 16:29] Project scaffolded from n8n starter template
What was finished
- Scaffolded the project from the n8n-nodes-starter template.
- Kept GithubIssues and Example as reference nodes for the declarative and programmatic node styles.
- Pulled the full OpenSolar API docs into docs/opensolar-api/ (52 content files + index.md as table of contents).

Decisions made
- Use GithubIssues as the pattern to follow for the eventual OpenSolar node (declarative style).

Next step
- Design the OpenSolar node's resources/operations based on docs/opensolar-api/schema-overview.md and related schema pages.

[2026-08-08 18:33] Costing, Payment Options, Pricing Schemes, and Hardware Activations — full CRUD, verified live
What was finished
- Built full CRUD (List, Get, Create, Update, Delete) for Costing, Payment Options, Pricing Schemes, and all four Hardware Activation resources (Modules, Inverters, Batteries, Other Components).
- Routing was verified against the live API with a one-off script, not trusted from the docs: the docs' POST-to-:id pattern was confirmed wrong for all of these resources. Real routing is standard DRF — POST to the plain endpoint creates, PATCH to :id/ updates; POST to :id/ returns 405 on every one of them.
- Added two new shared helpers: mergeFieldsCollectionWithJson (merges a Fields collection's named values with a JSON catch-all field into one request body) and componentActivation.ts's buildComponentActivationDescription (generates the entire resource description — operation dropdown, id field, pagination, Create/Update fields — for the four Hardware Activation resources from one shared config, since they're identical in shape).
- Fixed a bare-boolean-filter bug in Costing's priority filter (was being sent on every Get Many call regardless of whether the user touched it) and a matching bare-string-filter issue in system/getAll.ts's project filter — both now wrapped in Filters collections so they're only sent when explicitly added.

Decisions made
- pricing_formula is exposed as free text, not a locked options dropdown — the docs' own example response uses a value ("Price Per Module/Inverter/Battery") that isn't in the docs' own documented filter enum, so a strict dropdown would incorrectly block legitimate values.
- Other Components' catalog reference field (other) is optional, while Modules/Inverters/Batteries' equivalents are required — confirmed two different ways: Other Components' optionality via docs (other-components.md shows "other": null as a normal state), the other three's requiredness via a live 400 validation error on Modules.

Next step
- Same live-verification treatment for any remaining §3/§4 resources, then move on to Teams (§7) or Proposal Data per the suggested build order in RESOURCE-PLAN.md.

[2026-08-08 18:40] Teams (§7) — Connected Orgs, Permission Role, Bulk Share, Project Share/Unshare
What was finished
- Connected Orgs resource (resources/connectedOrg/): Create Connection Request, Get Many (List Connections), List Pending Requests, Accept Pending Request, Enable/Disable Connection (PATCH is_active), Delete Connection.
- Permission Role resource (resources/permissionRole/): Create only, matching the docs — no GET/PUT/DELETE documented for this endpoint. role_type is a fixed hidden field (always 1); permissions is passed through as a raw JSON-encoded string, not parsed, per custom-permission-for-teams.md.
- Project resource gained a new Share/Unshare operation (resources/project/share.ts), reusing Update Project's PUT routing and throttle-aware error handling with a shared_with JSON field.
- Bulk Share resource (resources/bulkShare/): single Share/Unshare operation with an Entity Type dropdown covering all 16 documented entity_types.

Decisions made
- Connected Orgs' list operation is labeled "Get Many" in the UI rather than "List Connections" — matches the getAll-operation naming convention used by every other resource in this node, and is required by the repo's n8n-nodes-base lint rule.

Next step
- Move on to §1's remaining pieces (Generate Document, Proposal Data) per the suggested build order.

[2026-08-08 18:52] Generate Document and Proposal Data (§1)
What was finished
- Generate Document resource (resources/generateDocument/): wraps only the recommended generate_document endpoint (not the legacy PDF alias or the DOCX endpoint). Document Type dropdown covers all 21 unique document types from the docs' combined PDF/CSV tables. Response handling requests arraybuffer/binary output (same pattern as System Image) since the response shape genuinely varies by flow — raw file bytes vs. a JSON Private File reference when action=save.
- Proposal Data resource (resources/proposalData/): single Get operation for GET /api/user_logins/. Notably has no Org ID field — unlike every other resource in this node, this endpoint is genuinely top-level, not org-scoped.
- Added handleProposalDataResponse to shared/errors.ts: intercepts HTTP 402 specifically and throws a NodeApiError naming Raw Data API Access directly, instead of letting OpenSolar's generic 402 body surface as an opaque failure.

Decisions made
- financials_report appears once in the Document Type dropdown, not twice — it's the same document_type value in both the docs' PDF and CSV tables, distinguished only by the file_format param, not two separate types.

Next step
- Build the OpenSolar Trigger node (webhooks) as its own node package, per RESOURCE-PLAN.md §8.

[2026-08-08 19:03] OpenSolar Trigger node — webhook-based trigger, separate node package
What was finished
- Built nodes/OpenSolarTrigger/OpenSolarTrigger.node.ts as a proper n8n Trigger node (group: ['trigger']) rather than a resource on the OpenSolar action node. Fetched GithubTrigger.node.ts from n8n-io/n8n as a reference for the webhookMethods pattern first, since the starter template only has action-node examples.
- Models multi-select (Project/Contact/Event/Quote/QuoteActivityLog) maps each selection to "<model>.*" in both trigger_fields and payload_fields.
- Full checkExists/create/delete lifecycle: checkExists always re-derives the webhook's id by GETting the list and matching on endpoint (there's no GET-by-id endpoint); create PATCH-reenables a previously-disabled match found by checkExists instead of creating a duplicate, or POSTs a new webhook if none exists; delete PATCHes enabled: false since there's no documented DELETE endpoint — the node's UI carries a notice explaining a "deleted" trigger leaves a disabled row behind in OpenSolar.
- Registered in package.json's n8n.nodes and confirmed the compiled module loads cleanly.

Decisions made
- Reused orgIdField from nodes/OpenSolar/shared/descriptions.ts via a relative import rather than duplicating it, since both node folders live in the same package.

Gotcha (debugged in a follow-up session)
- After building, the node didn't appear in n8n's search panel. Root cause: the locally running n8n instance had been started with plain `n8n start` well before the build finished, and n8n only scans its custom/community node_modules directory at boot — rebuilding dist/ alone does nothing to an already-running instance. Restarting n8n picked up the new node immediately. Confirmed via: process start time vs. dist file mtime, direct require() of the compiled module (both by repo-relative path and via the ~/.n8n/custom symlink) to rule out a load error, and a fresh startup log with no errors. Worth remembering for any future custom-node work in this repo: a rebuild needs a full n8n restart unless running under `npm run dev`'s watch mode.

Next step
- RESOURCE-PLAN.md's resource build-out is now essentially complete. Remaining work is verification rather than new resources: live-test the still-❔-flagged endpoints (Teams, Generate Document, Proposal Data) against a real org, the same way Costing/Payment Options/Pricing Schemes/Hardware Activations were verified earlier.
