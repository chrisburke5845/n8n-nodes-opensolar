# Payment Options

## Endpoint

| Endpoint | Query Parameters |
| --- | --- |
| GET /api/orgs/:org_id/payment_options/:id |  |
| POST /api/orgs/:org_id/payment_options/:id |  |
| DELETE /api/orgs/:org_id/payment_options/:id |  |
| GET /api/orgs/:org_id/payment_options/ | page, limit, priority (int), auto_apply_enabled (true, false),   payment_type (cash, loan, loan_advanced, ppa, regular_payment, lease) |

## Example

### Getting a list of payment options

Sample GET request and response (List of payment options):

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/payment_options/"
  -H "Authorization: Bearer <token>"
```

**Response**

```
[
  {
    "url": "https://api.opensolar.com/api/orgs/1/payment_options/242/",
    "org": "https://api.opensolar.com/api/orgs/1/",
    "utility_tariff_override": null,
    "is_archived": false,
    "payment_type": "loan_advanced",
    "title": "1 year Delay",
    "priority": 1,
    "configuration_json": "{\"collect_signature\":true,\"final_payment_frequency\":\"monthly\",\"final_term\":24,\"final_interest_rate\":6,\"final_dealer_fee_percentage\":null,\"final_dealer_fee_fixed\":null,\"down_payment_percentage\":10,\"down_payment_min\":10,\"down_payment_max\":10000,\"delayed_down_payment_duration\":12,\"down_payment_interest_rate\":7,\"down_payment_dealer_fee_percentage\":10,\"down_payment_dealer_fee_fixed\":50}",
    "description": "",
    "integration_external_reference": null,
    "created_date": "2019-10-13T23:51:34.296889Z",
    "modified_date": "2019-10-20T02:40:51.347454Z",
    "auto_apply_enabled": false,
    "use_highest_standard_system_price": true,
    "auto_discount": true,
    "auto_apply_only_specified_states": null,
    "auto_apply_only_specified_zips": null,
    "contract_template": "",
    "id": 242
  },
  ...
]
```
