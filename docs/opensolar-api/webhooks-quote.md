# Quote

A Quote webhook payload contains details about a supplier quote — line items, pricing, delivery address, contacts, and attached files.

Quote webhooks are triggered on `CREATE`, `UPDATE`, and `DELETE` events. Use `quote.*` in your `trigger_fields` and `payload_fields` to subscribe.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | integer | Quote ID. |
| `address` | string | Delivery address. |
| `zip` | string | Postal / ZIP code. |
| `state` | string | State or region. |
| `locality` | string | City or suburb. |
| `county` | string | null | County (if applicable). |
| `country` | string | ISO 3166-1 alpha-2 country code (e.g. `AU`, `US`). |
| `created_date` | datetime | When the quote was created. |
| `modified_date` | datetime | When the quote was last modified. |
| `status` | string | Current status (e.g. `under_review`, `awaiting_order`, `ordered`). |
| `quote_valid_until` | date | null | Expiry date of the quote. |
| `estimated_delivery_date` | date | null | Expected delivery date. |
| `notes` | string | Free-text notes on the quote. |
| `org_name` | string | Name of the organisation that owns the quote. |
| `supplier_name` | string | Name of the supplier organisation. |
| `project_id` | integer | null | Related project ID (if linked to a system). |
| `pro_contact` | object | null | Contact details of the pro user who created the quote. |
| `account_manager_data` | array | Account managers assigned to the quote. |
| `data` | object | Line items keyed by index. Each item contains `code`, `componentType`, `quantity`, `source`, `price`, `product_name`, and optionally `price_per_watt`. |
| `custom_data` | object | null | Arbitrary custom data attached to the quote. |
| `cost_summary` | object | Computed cost summary (subtotal, discount, shipping, tax, total). |
| `files` | array | Attached files with `file_name` and `file_url`. |

### pro_contact

| Field | Type | Description |
| --- | --- | --- |
| `display` | string | Display name. |
| `email` | string | Email address. |
| `phone` | string | Phone number. |

### account_manager_data

Array of objects, each containing:

| Field | Type | Description |
| --- | --- | --- |
| `display` | string | Display name. |
| `email` | string | Email address. |
| `phone` | string | Phone number. |

## Example

```
{
  "timestamp": "1710700000",
  "model": "Quote",
  "model_id": 456,
  "identifier": "456",
  "event": "UPDATE",
  "event_id": 12,
  "fields": {
    "id": 456,
    "address": "123 Main St",
    "zip": "2000",
    "state": "NSW",
    "locality": "Sydney",
    "county": null,
    "country": "AU",
    "created_date": "2025-02-15T10:00:00Z",
    "modified_date": "2025-02-20T14:30:00Z",
    "status": "awaiting_order",
    "quote_valid_until": "2025-03-01",
    "estimated_delivery_date": "2025-03-15",
    "notes": "Quote valid for 14 days.",
    "org_name": "Acme Solar",
    "supplier_name": "Suntech Wholesale",
    "project_id": 999,
    "pro_contact": {
      "display": "Susan Rays",
      "email": "susan@acmesolar.com",
      "phone": "+61 400 000 000"
    },
    "account_manager_data": [
      {
        "display": "Jane Smith",
        "email": "jane@suntech.com",
        "phone": "+61 400 111 111"
      }
    ],
    "data": {
      "0": {
        "code": "PANEL-001",
        "componentType": "module",
        "quantity": 20,
        "source": "suntech",
        "price": 150.00,
        "product_name": "Suntech 400W Module",
        "price_per_watt": "$0.38/W"
      },
      "1": {
        "code": "INV-001",
        "componentType": "inverter",
        "quantity": 1,
        "source": "suntech",
        "price": 2500.00,
        "product_name": "Fronius Primo 8.2"
      }
    },
    "custom_data": null,
    "cost_summary": {
      "subtotal": "$5,500.00",
      "discount": "$0.00",
      "shipping": "$120.00",
      "tax": "$562.00",
      "total": "$6,182.00"
    },
    "files": [
      {
        "file_name": "quote-detail.pdf",
        "file_url": "https://api.opensolar.com/media/..."
      }
    ]
  }
}
```
