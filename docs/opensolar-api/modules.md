# Modules

## Endpoint

| Endpoint | Query Parameters |
| --- | --- |
| GET /api/orgs/:org_id/component_module_activations/:id |  |
| POST /api/orgs/:org_id/component_module_activations/:id |  |
| DELETE /api/orgs/:org_id/component_module_activations/:id |  |
| GET /api/orgs/:org_id/component_module_activations/ | page, limit |

## Example

### Getting a list of activated modules

Sample GET request and response (List of activated modules):

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/component_module_activations/"
  -H "Authorization: Bearer <token>"
```

**Response**

```
[
  {
    "org": "https://api.opensolar.com/api/orgs/1/",
    "module": "https://api.opensolar.com/api/component_modules/8520/",
    "module_id": 8520,
    "manufacturer_name": "LG Energy",
    "cost": 0.0,
    "price_adjustment": 0.0,
    "quantity": 0,
    "data": "{\"annual_degradation_override\": 0.45, \"max_power_voltage\": 33.7, \"code\": \"LG330N1C-A5\", \"performance_warranty\": 25, \"cells_in_series\": 60, \"voc\": 40.9, \"product_warranty\": 25, \"temp_coefficient_voc\": -0.27, \"temp_coefficient_vpmax\": -0.37, \"kw_stc\": 0.33, \"height\": 1.686, \"width\": 1.016, \"noct\": 45.9, \"imp\": 9.8, \"temp_coefficient_isc\": 0.03, \"isc\": 10.45, \"transmission\": null, \"bifaciality\": 0.0, \"technology\": \"Mono-c-Si\", \"skus\": \"\", \"manufacturer_name\": \"LG Energy\"}",
    "code": "LG330N1C-A5",
    "is_default": false,
    "id": 1,
    "url": "https://api.opensolar.com/api/orgs/1/component_module_activations/1/",
    "_sku": "LG330N1C-A5",
    "is_archived": false,
    "product_warranty": null,
    "performance_warranty": null,
    "logo": "https://api.opensolar.com/static/s3_local/logo"
  },
  ...
]
```
