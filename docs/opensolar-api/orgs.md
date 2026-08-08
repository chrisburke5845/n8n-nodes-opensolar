# Orgs

An Org stores all your data on OpenSolar, including projects, contacts, team, configuration, etc.
Most endpoints are prefixed with the `/api/orgs/:org_id/...`

## Endpoint

| Endpoint | Description |
| --- | --- |
| GET /api/orgs/:org_id/ | Get Org |
| PUT /api/orgs/:org_id/ | Update Org |

## Examples

### Get Org Details

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/"
--header "Authorization: Bearer <token>"
```

**Response**

```
{
  "id": 1,
  "name": "My Company Name",
  "projects": "https://api.opensolar.com/api/orgs/:org_id/projects/",
  ...
}
```
