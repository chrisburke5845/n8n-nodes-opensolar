# Inverters

## Endpoint

| Endpoint | Query Parameters |
| --- | --- |
| GET /api/orgs/:org_id/component_inverter_activations/:id |  |
| POST /api/orgs/:org_id/component_inverter_activations/:id |  |
| DELETE /api/orgs/:org_id/component_inverter_activations/:id |  |
| GET /api/orgs/:org_id/component_inverter_activations/ | page, limit |

## Example

### Getting a list of activated inverters

Sample GET request and response (List of activated inverters):

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/component_inverter_activations/"
  -H "Authorization: Bearer <token>"
```

**Response**

```
[
  {
    "org": "https://api.opensolar.com/api/orgs/1/",
    "inverter": "https://api.opensolar.com/api/component_inverters/44/",
    "inverter_id": 44,
    "manufacturer_name": "Power-One",
    "cost": 0.0,
    "price_adjustment": 0.0,
    "quantity": 0,
    "data": "{\"voltage_minimum\": 100.0, \"microinverter\": \"N\", \"code\": \"PVI-3.0-OUTD-S-US [240V]\", \"power_consumption_at_night\": 0.1, \"product_warranty\": null, \"mppt_quantity\": 2, \"efficiency\": 96.0, \"additional_parts_warranty\": null, \"mppt_voltage_max\": null, \"voltage_nominal\": 240.0, \"voltage_max\": 480.0, \"max_power_rating\": 3.0, \"skus\": \"\", \"manufacturer_name\": \"Power-One\"}",
    "code": "PVI-3.0-OUTD-S-US [240V]",
    "is_default": false,
    "id": 3,
    "url": "https://api.opensolar.com/api/orgs/1/component_inverter_activations/3/",
    "_sku": "",
    "is_archived": false,
    "product_warranty": null,
    "additional_parts_warranty": null,
    "logo": "https://api.opensolar.com/static/s3_local/logo"
  },
  ...
]
```
