# Event

An Event payload contains details about events related to a project.

## Example

```
{
  "timestamp": "1605832669",
  "model": "Event",
  "model_id": 5,
  "identifier": "6ab6a60d-1a4d-4374-88af-92f7c02e3223",
  "event": "UPDATE",
  "event_id": 1,
  "fields": {
    "action": "/api/orgs/27/actions/1/",
    "archive_for": null,
    "completion_date": "2020-01-01T12:00:00.000000Z",
    "contact": "/api/orgs/15/contacts/6/",
    "created_date": "2020-01-02T12:00:00.000000Z",
    "duration": 0,
    "end": null,
    "event_type_id": 29,
    "id": 5,
    "is_archived": false,
    "is_complete": true,
    "location_override": "",
    "modified_date": "2020-01-01T12:00:00.000000Z",
    "notes": null,
    "org": "/api/orgs/15/",
    "project": "/api/orgs/15/projects/11/",
    "project_name": "Vandelay Industries",
    "repeat": 0,
    "start": null,
    "task_status": 0,
    "team_members": [],
    "title": "Design Systems",
    "url": "/api/orgs/15/events/5/",
    "user": "/auth/users/7/",
    "who": {
      "display": "george costanza",
      "email": "george@vanderlayindustries.com",
      "portrait_image_public_url": null
    }
  }
}
```
