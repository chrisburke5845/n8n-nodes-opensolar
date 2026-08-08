# Workflows

Ensure your team is staying on track with their projects by using Project Workflows to customise project stages and actions to match your business' needs. Stage and action details are accessible through the `workflow_stages` field.

## Endpoint

| Endpoint | Query Parameters |
| --- | --- |
| GET /api/orgs/:org_id/workflows/:id/ |  |
| POST /api/orgs/:org_id/workflows/ |  |
| PUT /api/orgs/:org_id/workflows/:id/ |  |
| DELETE /api/orgs/:org_id/workflows/:id/ |  |
| GET /api/orgs/:org_id/workflows/ | page, limit, is_default, is_archived |

**Stages and actions**

- Stages are accesible through the `workflow_stages` array.
- Actions for each stage are accessible through the `actions` array.
- Updating the workflow's stages and actions, involves updating the entire workflow entity. Make sure to put any existing data that you want to keep as part of the PUT payload.
- Creating a new action - add the new action as part of the Stage through the `actions` array, set it's `id` to `newAction-x` where `x` is the total number of actions that's part of that Stage, `title` is also required.

## Example

### Creating a workflow

Sample POST request and response (Create a workflow)

**Request**

```
curl --location 'https://api.opensolar.com/api/orgs/:org_id/workflows/'
  --request POST
  --header 'Content-Type: application/json'
  --header 'Authorization: Bearer <token>'
  --data '{
    "title": "My New Workflow",
    "is_default": true,
    "description": "A description for My New Workflow."
  }'
```

**Response**

```
{
  "url": "https://api.opensolar.com/api/orgs/:org_id/workflows/3/",
  "org": "https://api.opensolar.com/api/orgs/:org_id/",
  "workflow_stages": [
    {
      "id": 17,
      "title": "New",
      "milestone": 0,
      "order": 0,
      "is_archived": false,
      "actions": []
    },
    {
      "id": 18,
      "title": "Designing",
      "milestone": 0,
      "order": 1,
      "is_archived": false,
      "actions": [
        {
          "id": 7659,
          "title": "Design Systems",
          "url": "https://api.opensolar.com/api/orgs/:org_id/actions/7659/",
          "share_with_orgs": []
        },
        {
          "id": 7660,
          "title": "Send Proposal to Customer",
          "url": "https://api.opensolar.com/api/orgs/:org_id/actions/7660/",
          "share_with_orgs": []
        }
      ]
    }
  ],
  "title": "My New Workflow",
  "description": "A description for My New Workflow.",
  "is_default": true,
  "is_archived": false,
  "created_date": "2023-12-04T01:23:35.475391Z",
  "modified_date": "2023-12-04T01:23:35.475439Z",
  "share_with_orgs": [],
  "id": 3,
  "org_shared_time": []
}
```
