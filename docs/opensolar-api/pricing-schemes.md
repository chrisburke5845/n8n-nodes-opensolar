# Pricing Schemes

## Endpoint

| Endpoint | Query Parameters |
| --- | --- |
| GET /api/orgs/:org_id/pricing_schemes/:id |  |
| POST /api/orgs/:org_id/pricing_schemes/:id |  |
| DELETE /api/orgs/:org_id/pricing_schemes/:id |  |
| GET /api/orgs/:org_id/pricing_schemes/ | page, limit, priority (int), auto_apply_enabled (true, false),   pricing_formula (Markup Percentage, Price Per Watt, Price Per Watt By Size, Fixed Price) |

## Example

### Getting a list of pricing schemes

Sample GET request and response (List of pricing schemes):

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/pricing_schemes/"
  -H "Authorization: Bearer <token>"
```

**Response**

```
[
  {
    "url": "https://api.opensolar.com/api/orgs/1/pricing_schemes/68/",
    "org": "https://api.opensolar.com/api/orgs/1/",
    "is_archived": false,
    "pricing_formula": "Price Per Module/Inverter/Battery",
    "title": "per equipment",
    "priority": 1,
    "configuration_json": "{\"price_per_module\":500,\"price_per_inverter\":1000,\"price_per_battery\":2000,\"tax_percentage_included\":10}",
    "created_date": "2019-02-12T01:43:54.320315Z",
    "modified_date": "2019-02-12T01:43:54.320357Z",
    "auto_apply_enabled": true,
    "auto_apply_only_specified_states": null,
    "auto_apply_only_specified_zips": null,
    "id": 68
  },
  ...
]
```
