# Roles

## Endpoint

Details about a users role.

| Endpoint | Query Parameters |
| --- | --- |
| GET /api/orgs/:org_id/roles/ |  |
| GET /api/orgs/:org_id/roles/:id/ | fieldset (list), range, page, limit, ordering (id, is_admin) |

## Example

### Getting a list of roles

Sample GET request and response (List of roles):

**Request**

```
curl "https://api.opensolar.com/api/orgs/:org_id/roles/"
  -H "Authorization: Bearer <token>"
```

**Response**

```
[
  {
    "id": 99,
    "email": "john@workplace.com.au",
    "is_admin": true,
    "user": "https://api.opensolar.com/auth/users/99/",
    "user_email": "john@workplace.com.au",
    "org": "https://api.opensolar.com/api/orgs/88/",
    "is_hidden": false,
    "url": "https://api.opensolar.com/api/orgs/88/roles/77/",
    "first_name": "John",
    "family_name": "Person",
    "job_title": "Sales Person",
    "accreditation": "",
    "user_phone": "",
    "display": "John person",
    "phone": "94811111",
    "allow_email_notifications": true,
    "portrait_image": null,
    "google_calendar_id": null,
    "has_logged_in": true,
    "schedule_meeting_url": "https://calendly.com/john-os/customer-walk-through",
    "schedule_meeting_label": "Schedule a time to discuss!",
    "api_key_chat": "1234-567-11-0000",
    "user_is_staff": true,
    "org_name": "SunCo"
  },
  ...
]
```
