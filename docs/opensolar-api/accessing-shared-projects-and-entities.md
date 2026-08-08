# Accessing Shared Projects and Entities

Once a project or entity has been shared with an org, it will become available in that org's
normal CRUD endpoints (although for entities they will always be read only).

When using `fieldset=list`, it is possible to query/filter on the owner, or who an entity has been shared with.

## Projects:

- `owner_org_id` - Filter by the ID of the org who owns the project.
- `visible_to` - Filter by Org ID to see a list of projects shared with a connected org.

## Other entities:

- `owned_by` - Filter by the ID of the org who owns the entity.
- `shared_with` - Filter by Org ID to see a list of projects shared with a connected org.
