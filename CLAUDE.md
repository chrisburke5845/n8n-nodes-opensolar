# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This package (`n8n-nodes-opensolar`) is an n8n community node package that provides an
**OpenSolar** integration, built on top of the `n8n-nodes-starter` template (whose two scaffolded
examples, `nodes/Example` and `nodes/GithubIssues`, remain as reference implementations —
see `RESOURCE-PLAN.md` for the full inventory of OpenSolar resources still to be built).
`nodes/OpenSolar/` currently implements the **Project** resource (List, Get) against
`credentials/OpenSolarApi.credentials.ts` (bearer token auth).

`docs/opensolar-api/` is a local, offline mirror of the OpenSolar API docs
(https://developers.opensolar.com/api/), one Markdown file per page, kept for reference while
building the real node. Consult `docs/opensolar-api/index.md` for the sidebar/table of contents;
key pages: `getting-bearer-tokens.md` / `using-bearer-tokens.md` / `how-to-set-machine-user.md`
(auth), `schema-overview.md`, `orgs.md`, `projects.md`, `contacts.md` (core schema), `webhooks.md`
and `webhooks-*.md` (webhook payloads), and `api-conventions.md` / `throttle.md` / `error.md`
(request/response conventions). As of 2026-03-17, OpenSolar API access requires an org opted into
a paid API plan (see `api-access-plans.md`).

When building the OpenSolar node, follow the **declarative-style** pattern already established in
`nodes/GithubIssues/` (see Architecture below) rather than the programmatic style in
`nodes/Example/` — the GitHub node is the intended reference implementation for structure,
resource/operation layout, resourceLocator usage, and credential setup.

## Commands

- `npm run dev` — build with watch mode and run n8n locally with the node loaded (http://localhost:5678)
- `npm run build` — compile TypeScript to `dist/` via `n8n-node build` (what CI runs)
- `npm run build:watch` — `tsc --watch` only, no n8n
- `npm run lint` — `n8n-node lint` (n8n community node rules + ESLint)
- `npm run lint:fix` — same, with `--fix`
- `npm run release` — lint, build, version bump, changelog, commit, tag, push (triggers npm publish via GitHub Actions)

There is no test suite/script in this repo. CI (`.github/workflows/ci.yml`) runs only `npm run lint`
and `npm run build` on push to `main` and on PRs.

## Architecture

This is an n8n community node package built with `@n8n/node-cli`. Node type files and credential
files are plain TypeScript compiled by `tsc` (via `n8n-node build`) into `dist/`; `package.json`'s
`n8n.nodes` / `n8n.credentials` arrays list the compiled `dist/**` entry points that n8n loads —
**any new node or credential file must be added to these arrays** or n8n will never see it.

### Declarative-style node (the pattern to follow — see `nodes/GithubIssues/`)

Declarative nodes describe HTTP requests via `routing` metadata on `INodeProperties` instead of
writing an `execute()` method; n8n's core builds and dispatches the request. Structure:

- `<Node>.node.ts` — `INodeTypeDescription` with `requestDefaults` (baseURL, headers) and a
  `properties` array assembled by spreading per-resource description arrays. Also wires up
  `methods.listSearch` for any dynamic-dropdown (`resourceLocator`) fields.
- `resources/<resource>/index.ts` — defines the `operation` property for that resource (each
  option's `routing.request` sets `method` and `url`, with `={{$parameter.x}}` expressions for
  dynamic values), plus spreads in resource-scoped fields, then re-exports the per-operation
  description arrays.
- `resources/<resource>/<operation>.ts` — additional `INodeProperties` shown only for that
  resource+operation combo, gated with `displayOptions.show: { resource: [...], operation: [...] }`.
- `shared/descriptions.ts` — reusable `INodeProperties` (e.g. `resourceLocator` fields with
  `list`/`url`/`name` modes) shared across resources.
- `shared/transport.ts` — helper(s) for the rare authenticated request not expressible via
  declarative `routing` (e.g. calls from `listSearch` functions, which run outside the routing
  pipeline).
- `shared/utils.ts` — small pure helpers (e.g. `parseLinkHeader` for pagination).
- `listSearch/<thing>.ts` — `ILoadOptionsFunctions`-bound functions returning
  `INodeListSearchResult`, used by `resourceLocator` fields' `typeOptions.searchListMethod` to
  power searchable dropdowns; support `filter` and `paginationToken` args.

### Credentials

Each credential is a class implementing `ICredentialType` in `credentials/*.credentials.ts`, with
`authenticate: IAuthenticateGeneric` (how the credential is applied to requests — e.g. an
`Authorization` header built from `{{$credentials?.field}}`) and a `test: ICredentialTestRequest`
(a real endpoint call n8n uses to validate the credential in the UI). OAuth2 credentials `extends:
['oAuth2Api']` and configure auth/token URLs and scope as hidden properties. A node can offer
multiple auth methods by listing multiple entries in `description.credentials`, each gated with
`displayOptions.show: { authentication: [...] }` matching an `authentication` options property on
the node.

### Raw Data API Access-gated fields

Per `docs/opensolar-api/api-access-plans.md`, some fields are only populated for orgs on the
**Raw Data API Access** plan — on standard **API Access** they come back `null` or are omitted
entirely (the request still succeeds, HTTP 200). Two are documented today: `design` on
`GET .../projects/:id/` (Project) and `custom_data` on `GET .../systems/details/` (System
Details). Because declarative routing passes the API response straight through as `item.json`
without asserting a shape, this is automatically satisfied as long as no code path (a `listSearch`
function, a response-transforming `output` expression, a manually-typed response interface, etc.)
treats one of these fields as required. If you ever add typed interfaces or post-processing for
Project or System Details responses, type the gated fields as optional/nullable
(e.g. `design?: string | null`) rather than required — the node must keep working for API Access
users, just with less data, not error for them. Check `api-access-plans.md` for the current list
before assuming a new field is unrestricted.

### Programmatic-style node (`nodes/Example/`)

For nodes that need custom logic, implement `execute(this: IExecuteFunctions)` directly, iterate
`this.getInputData()`, and return `[items]`. Follow the per-item try/catch shown there
(`continueOnFail()` pushes an error item; otherwise rethrow as `NodeOperationError` with
`itemIndex`) for consistent error handling across items.

### Trigger node (`nodes/OpenSolarTrigger/`)

Webhook-based trigger nodes are a third, distinct pattern — neither declarative `routing` nor a
plain `execute()`. `OpenSolarTrigger.node.ts` is its own top-level node package (not a resource on
`nodes/OpenSolar/`), with `group: ['trigger']`, `inputs: []`, a `webhooks` array on the
description, a `webhookMethods.default.{checkExists, create, delete}` lifecycle (all three are
required — n8n's lint enforces this), and a `webhook(this: IWebhookFunctions)` method that runs
when OpenSolar actually calls in. It has its own `GenericFunctions.ts` (`openSolarApiRequest`,
using `this.helpers.httpRequestWithAuthentication` against the same `openSolarApi` credential —
declarative `routing` doesn't apply here since hooks/webhook execution aren't part of that
pipeline) but reuses `orgIdField` from `nodes/OpenSolar/shared/descriptions.ts` directly via a
relative import, rather than duplicating it. Because OpenSolar's Webhooks API has no documented
DELETE, `delete` PATCHes `enabled: false` instead of removing the registration — `checkExists`
always re-derives the webhook's id by listing and matching on `endpoint` (there's no GET-by-id) so
that a subsequent `create` can PATCH a previously-disabled match back to enabled rather than
creating a duplicate. See `RESOURCE-PLAN.md` §8 for the full design rationale.

## Code style

Formatting is enforced by Prettier (`.prettierrc.js`: tabs, single quotes, semicolons, trailing
commas, 100-char print width) and linted via `n8n-node lint`, which layers n8n's community-node
rules (see `eslint.config.mjs`) on top of ESLint. Run `npm run lint:fix` before committing.
