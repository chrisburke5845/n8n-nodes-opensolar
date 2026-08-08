# Other Components

## Endpoint

| Endpoint | Query Parameters |
| --- | --- |
| GET /api/orgs/:org_id/component_other_activations/:id |  |
| POST /api/orgs/:org_id/component_other_activations/:id |  |
| DELETE /api/orgs/:org_id/component_other_activations/:id |  |
| GET /api/orgs/:org_id/component_other_activations/ | page, limit |

## Example

### Getting a list of activated components

Sample GET request and response (List of activated "other" components):

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/component_other_activations/"
  -H "Authorization: Bearer <token>"
```

**Response**

```
[
  {
    "org": "https://api.opensolar.com/api/orgs/1/",
    "other": null,
    "other_id": null,
    "manufacturer_name": "",
    "cost": 100.0,
    "price_adjustment": 0.0,
    "quantity": 0,
    "data": "{\"product_warranty\": null, \"show_customer\": true, \"code\": \"component\", \"description\": \"\", \"manufacturer_name\": \"\"}",
    "code": "component",
    "id": 2,
    "url": "https://api.opensolar.com/api/orgs/1/component_other_activations/2/",
    "_sku": "",
    "is_archived": false,
    "product_warranty": null
  },
  ...
]
```
