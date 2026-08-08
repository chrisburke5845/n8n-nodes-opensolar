# Batteries

## Endpoint

| Endpoint | Query Parameters |
| --- | --- |
| GET /api/orgs/:org_id/component_battery_activations/:id |  |
| POST /api/orgs/:org_id/component_battery_activations/:id |  |
| DELETE /api/orgs/:org_id/component_battery_activations/:id |  |
| GET /api/orgs/:org_id/component_battery_activations/ | page, limit |

## Example

### Getting a list of activated batteries

Sample GET request and response (List of activated batteries):

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/component_battery_activations/"
  -H "Authorization: Bearer <token>"
```

**Response**

```
[
  {
    "org": "https://api.opensolar.com/api/orgs/1/",
    "battery": "https://api.opensolar.com/api/component_batteries/1/",
    "battery_id": 1,
    "manufacturer_name": "TESLA",
    "cost": 0.0,
    "price_adjustment": 0.0,
    "quantity": 0,
    "data": "{\"code\": \"POWERWALL1 (240V)\", \"end_of_life_capacity\": 0.6, \"power_max_continuous\": 3.3, \"aging_factor\": 1.0, \"rating_optimal\": 0.0, \"depth_of_discharge_factor\": 1.0, \"voltage\": 240.0, \"kwh_optimal\": 6.4, \"warranty_kwh_1_cycle_per_day\": 15709.0, \"power_optimal\": 3.3, \"efficiency_factor\": 0.89, \"manufacturer\": \"TESLA\", \"manufacturer_name\": \"TESLA\"}",
    "code": "POWERWALL1 (240V)",
    "id": 3,
    "url": "https://api.opensolar.com/api/orgs/1/component_battery_activations/3/",
    "_sku": "",
    "is_archived": false,
    "product_warranty": null
  },
  ...
]
```
