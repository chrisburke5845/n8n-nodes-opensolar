# Contacts

A Contact may optionally have an OpenSolar User Login attached, which allows a Customer to login to MyEnergy.
Personal details for an individual Customer is stored as a Contact.

## Endpoint

| Endpoint | Description | Query Parameters |
| --- | --- | --- |
| GET /api/orgs/:org_id/contacts/ | List Contacts | page, limit |
| GET /api/orgs/:org_id/contacts/:id/ | Get Contact |  |
| POST /api/orgs/:org_id/contacts/ | Create Contact |  |
| PUT /api/orgs/:org_id/contacts/:id/ | Update Contact |  |
| DELETE /api/orgs/:org_id/contacts/:id/ | Delete Contact |  |

## Examples

### Getting a list of Contacts

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/contacts/"
  -H "Authorization: Bearer <token>"
```

**Response**

```
[
  {
    "id": 34,
    "first_name": "Edmond",
    "family_name": "Becquerel",
    ...
  },
  ...
]
```
