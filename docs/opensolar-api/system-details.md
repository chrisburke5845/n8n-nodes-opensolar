# Systems Details

Returns an object with design-related data for each system in a given project. The data returned includes hardware, adders, incentives and information on module layout.

> **Warning:**
>
> This endpoint is only accessible for projects owned by the organisation. If you have access to a project that is shared to you via the Teams functionality, you won't be able to access system details for it.

> **Note:**
>
> Response content depends on your organisation's API plan. Organisations on **API Access** receive a reduced set of fields; **Raw Data API Access** receives the full response (as in the examples below). See [API Access Plans](api-access-plans.md) for details.

## Endpoint

| Endpoint | Query Parameters |
| --- | --- |
| GET /api/orgs/:org_id/projects/:project_id/systems/details/ | limit_to_sold, include_parts, exclude_parts |

The GET /systems/details/ endpoint has been known to timeout when the project has a considerable amount of data.
To circumvent this limitation we recommend minimizing the response data by only fetching only the fields that you're interested in.

**Parameters**

- `limit_to_sold` - optional, fetch only systems that have been sold.
- `include_parts` - optional, allows cherry-picking specific fields. This only affects the contents of the system data field.
- `exclude_parts` - optional, allows retaining most fields while excluding specific ones. This only affects the contents of the system data field.

> **Note:**
>
> *include_parts* and *exclude_parts* can not be used together.

## Example

### Getting system details

Sample GET request and response (Get system details):

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/projects/:project_id/systems/details/"
  -H "Authorization: Bearer <token>"
```

**Response**

```
{
  "systems": [
    {
      "kw_stc": 6.21,
      "uuid": "E583FD88-EB6C-4311-91A9-AC719041EAA8",
      "id": 8280,
      "name": "System 1 (6.21 kW)",
      "modules": [
        {
          "manufacturer_name": "LG Electronics Inc.",
          "code": "LG345N1C-V5",
          "quantity": 18
        }
      ],
      "total_module_quantity": 18,
      "inverters": [
        {
          "manufacturer_name": "123",
          "code": "123",
          "quantity": 1
        }
      ],
      "batteries": [
        {
          "manufacturer_name": "GoodWe",
          "code": "2*LX U5.4-L",
          "quantity": 1
        }
      ],
      "other_components": [
        {
          "manufacturer_name": "Hardware Co.",
          "code": "dc_isolator_xyz",
          "quantity": 1
        }
      ],
      "adders": [
        {
          "label": "Adder",
          "total_value": 20.0,
          "total_cost": 0,
          "show_customer": false,
          "quantity": 2
        },
        {
          "label": "Discount",
          "total_value": -30.0,
          "total_cost": 0,
          "show_customer": false,
          "quantity": 3
        },
        {
          "label": "Cost",
          "total_value": 0,
          "total_cost": 20.0,
          "show_customer": false,
          "quantity": 1
        }
      ],
      "module_groups": [
        {
          "module_quantity": 18,
          "azimuth": 7,
          "slope": 20.0,
          "layout": "portrait"
        }
      ],
      "incentives":	[
        {
          "paid_to_customer": true,
          "value": 884,
          "title": "6% Base Federal Investment Tax Credit (ITC)"
        }
      ],
      "data":{}
    },
    ...
  ]
}
```

### Getting System Details - MCS only

**Request**

```
curl --location 'https://api.opensolar.com/api/orgs/894/projects/15393/systems/details/?include_parts=mcs’
  --header 'Authorization: Bearer token'
```

**Response**

```
{
    "systems": [
        {
            "kw_stc": 4.07,
            "uuid": "0DEADB0B-96EA-430E-8239-4FC40F51C64D",
            "id": 10160,
            "name": "System 1 (4.07 kW)",
            "modules": [
                {
                    "manufacturer_name": "REC Solar",
                    "code": "REC370AA Black",
                    "quantity": 11
                }
            ],
            "total_module_quantity": 11,
            "inverters": [
                {
                    "manufacturer_name": "Enphase Energy Inc.",
                    "code": "IQ7A-72-2-INT",
                    "quantity": 11
                }
            ],
            "batteries": [
                {
                    "manufacturer_name": "SolarEdge Technologies Ltd.",
                    "code": "BAT-10K1P",
                    "quantity": 1
                }
            ],
            "other_components": [
                {
                    "manufacturer_name": "Solar Analytics",
                    "code": "Annual Subscription (Systems 15kW or Less)",
                    "quantity": 1
                },
                {
                    "manufacturer_name": "Empowered by Light",
                    "code": "Empowered by Light",
                    "quantity": 1
                }
            ],
            "adders": [],
            "module_groups": [
                {
                    "module_quantity": 3,
                    "azimuth": 224,
                    "slope": 20.0,
                    "layout": "portrait"
                },
                {
                    "module_quantity": 4,
                    "azimuth": 134.0,
                    "slope": 20.0,
                    "layout": "portrait"
                },
                {
                    "module_quantity": 4,
                    "azimuth": 174,
                    "slope": 20.0,
                    "layout": "portrait"
                }
            ],
            "incentives": [],
            "data": {
                "mcs": {
                    "mcsSystemPanelAzimuth": "Group 1: 3 panels with Orientation: 45 ° \nGroup 2: 4 panels with Orientation: 45 ° \nGroup 3: 4 panels with Orientation: 5 ° \n",
                    "mcsSystemPanelTilt": "Group 1: 3 panels with Tilt: 20° \nGroup 2: 4 panels with Tilt: 20° \nGroup 3: 4 panels with Tilt: 20° \n",
                    "mcsPostCodeRegion": "1",
                    "mcsSpecificYieldBeforeShading": "Group 1: 908 \nGroup 2: 908 \nGroup 3: 946 \n",
                    "shadingFactor": "1",
                    "mcsOccupancyArchetype": "In Half Day"
                }
            }
        }
    ]
}
```
