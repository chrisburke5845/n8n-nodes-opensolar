# Systems

A System stores all of the detail, energy output, system size, pricing etc. for a particular system design. There may be more than one System associated with a Project.

## Endpoint

| Endpoint | Query Parameters |
| --- | --- |
| GET /api/orgs/:org_id/systems/:id/ | **fieldset=list (required)** |
| GET /api/orgs/:org_id/systems/ | **fieldset=list (required)**, page, limit, project (id) |

## Example

### Getting a list of Systems

Sample GET request and response (List of all systems):

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/systems/?fieldset=list"
  -H "Authorization: Bearer <token>"
```

**Response**

```
[
  {
      "id": 1253,
      "url": "https://api.opensolar.com/api/orgs/1/systems/1253/",
      "name": "",
      "uuid": "E583FD88-EB6C-4311-91A9-AC719041EAA8",
      "order": 0,
      "system_lifetime": 0,
      "inverter_range": null,
      "dc_optimizer_active": false,
      "dc_optimizer_efficiency": 1.0,
      "show_customer": true,
      "is_current": false,
      "auto_string": true,
      "discount": 0.0,
      "adders_per_system": 0.0,
      "adders_per_panel": 0.0,
      "adders_per_watt": 0.0,
      "kw_stc": 2.76,
      "battery_total_kwh": 0.0,
      "price_including_tax": 5520.0,
      "price_excluding_tax": 5018.18,
      "net_profit": 11416.05,
      "module_quantity": 8,
      "co2_tons_lifetime": 65.96,
      "project": "https://api.opensolar.com/api/orgs/1/projects/100/",
      "org": "https://api.opensolar.com/api/orgs/1/",
      "pricing_scheme": "https://api.opensolar.com/api/orgs/1/pricing_schemes/1408/",
      "output_annual_kwh": 5497,
      "consumption_offset_percentage": 82,
      "modules": [
          {
              "module_activation_id": 613,
              "code": "JKM285M-60",
              "manufacturer_name": "Jinko Solar Co., Ltd",
              "quantity": 20
          }
      ],
      "inverters": [],
      "batteries": [],
      "others": []
  },
  ...
]
```
