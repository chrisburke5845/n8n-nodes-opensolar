# Webhooks Logs

Webhook logs can be inspected at `https://api.opensolar.com/api/orgs/:org_id/webhook_process_logs/` as a standard API response or as CSV by adding the querystring `format=csv`.

**Parameters**

- `limit` - optional, number of entries to be in the response per `page`.
- `page` - optional, page index. *Will return a 500 Internal Server Error when page the is empty.*
- `search` - optional, matches the term if it exists in a webhook log.

## Example

**Request**

```
curl --location 'https://api.opensolar.com/api/orgs/123/webhook_process_logs/' \
  -H 'Authorization: Bearer <token>'
```

**Response**

```
[
  {
    "url": "https://api.opensolar.com/api/orgs/123/webhook_process_logs/347/",
    "org": "https://api.opensolar.com/api/orgs/123/",
    "webhook": "https://api.opensolar.com/api/orgs/123/webhooks/123/",
    "created_date": "2024-12-01T23:42:49.465397Z",
    "modified_date": "2024-12-01T23:42:49.465444Z",
    "successful": true,
    "model_name": "Project",
    "model_pk": 123123,
    "event_queue_name": "WebhookQueueModel",
    "event_id": 123123,
    "event_name": "UPDATE",
    "event_timestamp": "2024-12-01T23:42:49.464822Z",
    "notes": null,
    "id": 56573654
  },
  ...
]
```
