# Quote Activity Log

A Quote Activity Log webhook payload represents an event on a supplier quote — messages, file attachments, and system events such as status changes.

Quote Activity Log webhooks are triggered on `CREATE` and `DELETE` events only. Activity logs are immutable once created — there is no update endpoint — so `UPDATE` events are never fired. Use `quoteactivitylog.*` in your `trigger_fields` and `payload_fields` to subscribe.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | integer | Activity log ID. |
| `quote_id` | integer | ID of the parent quote. |
| `quote_address` | string | null | Delivery address from the quote. |
| `quote_status` | string | null | Current quote status (e.g. `under_review`, `awaiting_order`). |
| `quote_created_date` | datetime | null | When the parent quote was created. |
| `quote_valid_until` | date | null | Expiry date of the parent quote. |
| `pro_contact` | object | null | Contact details of the pro user who created the quote. |
| `account_manager_data` | array | Account managers assigned to the quote. |
| `activity_type` | string | Type of activity: `message`, `file`, or `event`. |
| `message` | string | Activity message text. |
| `created_by_data` | object | null | User who created this activity log entry. |
| `created_at` | datetime | When the activity was logged. |
| `is_deleted` | boolean | Whether the log entry has been soft-deleted. |
| `file_url` | string | null | Download URL for an attached file (if `activity_type` is `file`). |
| `file_name` | string | null | Name of the attached file. |
| `message_data` | array | Structured message history for the log entry. |

### pro_contact

| Field | Type | Description |
| --- | --- | --- |
| `display` | string | Display name. |
| `email` | string | Email address. |
| `phone` | string | Phone number. |

### created_by_data

| Field | Type | Description |
| --- | --- | --- |
| `display` | string | Display name. |
| `email` | string | Email address. |

## Example

```
{
  "timestamp": "1710700500",
  "model": "QuoteActivityLog",
  "model_id": 789,
  "identifier": "789",
  "event": "CREATE",
  "event_id": 15,
  "fields": {
    "id": 789,
    "quote_id": 456,
    "quote_address": "123 Main St",
    "quote_status": "under_review",
    "quote_created_date": "2025-02-15T10:00:00Z",
    "quote_valid_until": "2025-03-01",
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
    "activity_type": "message",
    "message": "Updated estimated delivery to 20 March.",
    "created_by_data": {
      "display": "Jane Smith",
      "email": "jane@suntech.com"
    },
    "created_at": "2025-02-20T14:30:00Z",
    "is_deleted": false,
    "file_url": null,
    "file_name": null,
    "message_data": [
      {
        "title": "Message",
        "message": "Updated estimated delivery to 20 March.",
        "time": "20 Feb 2025, 2:30PM"
      }
    ]
  }
}
```
