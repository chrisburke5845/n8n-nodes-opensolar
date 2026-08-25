# n8n-nodes-opensolar

An [n8n](https://n8n.io) community node package for [OpenSolar](https://www.opensolar.com/) — a
regular node (**OpenSolar**) covering the OpenSolar REST API, and a webhook-based trigger node
(**OpenSolar Trigger**) that starts a workflow when OpenSolar pushes an event.

## Installation

### n8n Cloud / self-hosted, via the UI

In n8n, go to **Settings > Community Nodes**, select **Install**, and enter
`n8n-nodes-opensolar`.

### Self-hosted, via npm

```bash
npm install n8n-nodes-opensolar
```

See n8n's [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/)
for more options (Docker, `N8N_CUSTOM_EXTENSIONS`, etc.).

## Credentials

Both nodes use a single **OpenSolar API** credential: a bearer token sent as
`Authorization: Bearer <token>` on every request.

1. Obtain a token via `POST https://api.opensolar.com/api-token-auth/` with your OpenSolar
   `username`/`password` (and `token` for your current MFA code, if enabled) — see
   [Getting Bearer Tokens](https://developers.opensolar.com/api/getting-bearer-tokens) for the
   full request/response shape, including the flow for Nearmap (NMOS) logins.
2. **Standard user tokens expire after 7 days.** For a token that doesn't expire — the normal
   choice for an automation credential — set your OpenSolar user as a **machine user**:
   `PATCH https://api.opensolar.com/auth/users/{user_id}/` with body `{"is_machine_user": true}`,
   using the user's numeric ID (not a role ID). See
   [How to Set Machine User](https://developers.opensolar.com/api/how-to-set-machine-user).
3. Paste the token into the credential's **Token** field in n8n.

As of March 2026, calling the OpenSolar API at all requires your org to be on a paid **API
Access** or **Raw Data API Access** plan (a 30-day free trial is available) — see
[API Access Plans](https://developers.opensolar.com/api/api-access-plans). A few fields and one
endpoint (Proposal Data) are gated to Raw Data API Access specifically; where that applies, the
relevant resource below calls it out.

## Node: OpenSolar

Every operation is scoped to an **Org ID** (there is no "list my orgs" endpoint in the OpenSolar
API, so this is a plain required field, not a dropdown — find your org ID in the OpenSolar app
URL or via the Org resource's Get operation).

| Resource | Operations |
| --- | --- |
| **Project** | Get Many, Get, Create, Update, Update (Partial), Delete, Share/Unshare |
| **Contact** | Get Many, Get, Create, Update, Delete |
| **System** | Get Many, Get *(read-only — systems are created via the OpenSolar design tool, not the API)* |
| **System Details** | Get |
| **System Image** | Get |
| **Generate Document** | Generate *(proposals, contracts, and other PDF/CSV project documents)* |
| **Proposal Data** | Get *(requires Raw Data API Access — returns HTTP 402 otherwise)* |
| **Org** | Get, Update |
| **Workflow** | Get Many, Get, Create, Update, Delete |
| **Role** | Get Many, Get *(read-only)* |
| **Costing** | Get Many, Get, Create, Update, Delete |
| **Payment Option** | Get Many, Get, Create, Update, Delete |
| **Pricing Scheme** | Get Many, Get, Create, Update, Delete |
| **Module Activation** | Get Many, Get, Create, Update, Delete |
| **Inverter Activation** | Get Many, Get, Create, Update, Delete |
| **Battery Activation** | Get Many, Get, Create, Update, Delete |
| **Other Component Activation** | Get Many, Get, Create, Update, Delete |
| **Private File** | Get Many, Get, Create, Update, Delete |
| **Connected Org** | Get Many, List Pending Requests, Create Connection Request, Accept Pending Request, Enable/Disable Connection, Delete Connection |
| **Permission Role** | Create *(no Get/Update/Delete is documented for this endpoint)* |
| **Bulk Share** | Share/Unshare *(share or unshare a batch of one entity type — pricing schemes, costings, adders, and more — with a connected org)* |
| **Webhook** | Get Many, Get Many Process Logs, Get Many Queued, Create, Update *(webhook *registrations*; see the Trigger node below to actually receive events)* |

## Node: OpenSolar Trigger

A proper n8n trigger node: it self-registers a webhook with OpenSolar on activation and starts
the workflow whenever a matching event arrives. Select which models to subscribe to —
**Project**, **Contact**, **Event**, **Quote**, **QuoteActivityLog** — and OpenSolar will POST to
n8n on every create/update/delete for those models (QuoteActivityLog is create/delete only; it's
never updated).

OpenSolar's Webhooks API has no documented delete endpoint. Deactivating or deleting this node
**disables** the webhook in OpenSolar (`PATCH enabled=false`) rather than removing it — the
subscription stays visible, disabled, under **Control > Integrations > Webhooks** in the
OpenSolar app. Re-activating the same node re-enables that same webhook rather than creating a
duplicate.

## Compatibility

Requires n8n with community node support. Built and tested against `n8n-workflow ^2.16.0`. No
external runtime dependencies.

## Resources

- [OpenSolar API documentation](https://developers.opensolar.com/api/)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
