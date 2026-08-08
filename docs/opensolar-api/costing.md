# Costing

## Endpoint

| Endpoint | Query Parameters |
| --- | --- |
| GET /api/orgs/:org_id/costings/:id |  |
| POST /api/orgs/:org_id/costings/:id |  |
| DELETE /api/orgs/:org_id/costings/:id |  |
| GET /api/orgs/:org_id/costings/ | page, limit, priority (true, false) |

## Example

### Getting a list of costings

Sample GET request and response (List of costings):

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/costings/"
  -H "Authorization: Bearer <token>"
```

**Response**

```
[
  {
    "url": "https://api.opensolar.com/api/orgs/1/costings/1/",
    "org": "https://api.opensolar.com/api/orgs/1/",
    "roof_type_adder_1_roof_type": null,
    "roof_type_adder_2_roof_type": null,
    "roof_type_adder_3_roof_type": null,
    "roof_type_adder_4_roof_type": null,
    "roof_type_adder_5_roof_type": null,
    "title": "Default Project Configuration",
    "description": "Default settings ready for customization.",
    "priority": true,
    "created_date": "2020-04-15T06:49:15.938679Z",
    "modified_date": "2020-04-15T06:49:15.938715Z",
    "supplier_shipping_per_system": 0.0,
    "supplier_shipping_per_panel": 0.0,
    "supplier_shipping_per_watt": 0.0,
    "racking_per_system": 0.0,
    "racking_per_panel": 0.0,
    "racking_per_watt": 0.0,
    "bos_per_system": 0.0,
    "bos_per_panel": 0.0,
    "bos_per_watt": 0.0,
    "job_site_shipping_and_warehousing_per_system": 0.0,
    "job_site_shipping_and_warehousing_per_panel": 0.0,
    "job_site_shipping_and_warehousing_per_watt": 0.0,
    "labor_per_system": 0.0,
    "labor_per_panel": 0.0,
    "labor_per_watt": 0.0,
    "allocation_of_lead_gen_per_system": 0.0,
    "allocation_of_lead_gen_per_panel": 0.0,
    "allocation_of_lead_gen_per_watt": 0.0,
    "allocation_of_salary_per_system": 0.0,
    "allocation_of_salary_per_panel": 0.0,
    "allocation_of_salary_per_watt": 0.0,
    "commission_per_system": 0.0,
    "commission_per_panel": 0.0,
    "commission_per_watt": 0.0,
    "commission_percentage_of_cogs_and_labor": 0.0,
    "project_management_per_system": 0.0,
    "project_management_per_panel": 0.0,
    "project_management_per_watt": 0.0,
    "design_drawings_per_system": 0.0,
    "design_drawings_per_panel": 0.0,
    "design_drawings_per_watt": 0.0,
    "permit_costs_per_system": 0.0,
    "permit_costs_per_panel": 0.0,
    "permit_costs_per_watt": 0.0,
    "other_costs_per_system": 0.0,
    "other_costs_per_panel": 0.0,
    "other_costs_per_watt": 0.0,
    "presale_software_and_design_per_system": 0.0,
    "presale_software_and_design_per_panel": 0.0,
    "presale_software_and_design_per_watt": 0.0,
    "roof_type_adder_1_cost_per_system": 0.0,
    "roof_type_adder_1_cost_per_panel": 0.0,
    "roof_type_adder_1_cost_per_watt": 0.0,
    "roof_type_adder_2_cost_per_system": 0.0,
    "roof_type_adder_2_cost_per_panel": 0.0,
    "roof_type_adder_2_cost_per_watt": 0.0,
    "roof_type_adder_3_cost_per_system": 0.0,
    "roof_type_adder_3_cost_per_panel": 0.0,
    "roof_type_adder_3_cost_per_watt": 0.0,
    "roof_type_adder_4_cost_per_system": 0.0,
    "roof_type_adder_4_cost_per_panel": 0.0,
    "roof_type_adder_4_cost_per_watt": 0.0,
    "roof_type_adder_5_cost_per_system": 0.0,
    "roof_type_adder_5_cost_per_panel": 0.0,
    "roof_type_adder_5_cost_per_watt": 0.0,
    "storeys_two_cost_per_system": 0.0,
    "storeys_two_cost_per_panel": 0.0,
    "storeys_two_cost_per_watt": 0.0,
    "storeys_three_plus_cost_per_system": 0.0,
    "storeys_three_plus_cost_per_panel": 0.0,
    "storeys_three_plus_cost_per_watt": 0.0,
    "steep_pitch_1_slope": 25,
    "steep_pitch_1_cost_per_system": 0.0,
    "steep_pitch_1_cost_per_panel": 0.0,
    "steep_pitch_1_cost_per_watt": 0.0,
    "steep_pitch_2_slope": 40,
    "steep_pitch_2_cost_per_system": 0.0,
    "steep_pitch_2_cost_per_panel": 0.0,
    "steep_pitch_2_cost_per_watt": 0.0,
    "split_array_layout_cost_per_system": 0.0,
    "split_array_layout_cost_per_panel": 0.0,
    "split_array_layout_cost_per_watt": 0.0,
    "tilt_rack_cost_per_system": 0.0,
    "tilt_rack_cost_per_panel": 0.0,
    "tilt_rack_cost_per_watt": 0.0,
    "id": 1
  },
  ...
]
```
