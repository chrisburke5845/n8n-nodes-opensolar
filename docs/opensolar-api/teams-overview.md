# Overview

> **Note:**
>
> Only Admins can establish and manage Teams connections. All user's with project access can use Teams.

Teams is a feature that facilitates collaboration and data sharing among different organizations involved in solar projects. It allows you to connect with other businesses, share project data, and streamline your workflow.

## Example

Step-by-step to using teams:

- OrgA requests to connect with OrgB (`POST to /connected_orgs/`)
- OrgB accepts the connection request (`POST to /connected_orgs/accept_connection/`)
- The above steps only need to be completed once
- OrgA and OrgB can now share entities with one another which will be used in collaborative projects
- Optionally also define some Custom Permissions to control what the partner org can acces in your projects
  (`POST to /permissions_role/`)
- OrgA or OrgB can now share any project they create with the other.
  - These projects can use any components/entities, but only those which are shared to the partner org will be visible
  - Using unshared entities will add warnings to the project data, and the OpenSolar UI for this project
  - On a per-project basis, custom permissions can be assigned by the owner org to control what the partner org can do
