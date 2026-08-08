# Throttle Limits

## Overview

To maintain optimal performance and safeguard against misuse, the OpenSolar API enforces throttle limits on various endpoints.

## Types of Throttling

There are 2 types of throttling on OpenSolar:

- **Throttling per User:** Impacts the user from accessing the endpoint
- **Throttling per Org:** Impacts all users of the organisation from accessing the endpoint

You can read more about the respective throttling limits for each of the endpoints below.

## Throttling Limits

### Common Endpoints

We have specified throttle limits for the most commonly impacted endpoints.

> **Note:**
>
> All endpoints on OpenSolar have a throttle quota applied to them even if they are not listed below.

| Action Summary | URL | Throttling per user | Throttling per org |
| --- | --- | --- | --- |
| Create Project | POST /api/orgs/<org_id>/projects/ | 10/min | 10,000/day |
| Update Project | PUT /api/orgs/<org_id>/projects/<pk>/ | 10/min | 10,000/day |
| Partially Update Project | PATCH /api/orgs/<org_id>/projects/<pk>/ | 10/min | 10,000/day |
| Get Project Details | GET /api/orgs/<org_id>/projects/<pk>/ | 100/min | 10,000/day |
| Get System Details for Project | GET /orgs/<org_id>/projects/<project_id>/systems/details/ | 60/min | 10,000/day |
| Get System Image | GET /orgs/<org_id>/projects/<project_id>/systems/<system_uuid>/image/ | 10/min | 10,000/day |

### Teams Functionality

| Action Summary | URL | Throttling per user | Throttling per org |
| --- | --- | --- | --- |
| Create Connected Org | POST /api/orgs/<org_id>/connected_orgs/ | 100/day | 100/day |
| Partially Update Connected Org | PATCH /api/orgs/<org_id>/connected_orgs/<pk>/ | 100/day | 100/day |
| Get List of Connected Org | GET /api/orgs/<org_id>/connected_orgs/ | 100/day | 100/day |

### Proposal Data (user_logins)

| Action Summary | URL | Throttling per user | Throttling per org |
| --- | --- | --- | --- |
| Get Proposal Data | GET /api/user_logins/ | 100/min | 10,000/day |

### Private Files

| Action Summary | URL | Throttling per user | Throttling per org |
| --- | --- | --- | --- |
| Create Private File (Org) | POST /api/orgs/<org_id>/private_files | n/a | 1000/day |
| Partially Update Private File (Org) | PATCH /api/orgs/<org_id>/private_files/<pk>/ | n/a | 1000/day |
| Get List of Private Files (Org) | GET /api/orgs/<org_id>/private_files/ | n/a | 1000/day |
| Create Private File (User) | POST /api/orgs/<org_id>/private_files | 1000/hour | n/a |
| Partially Update Private File (User) | PATCH /api/orgs/<org_id>/private_files/<pk>/ | 1000/hour | n/a |
| Get List of Private Files (User) | GET /api/orgs/<org_id>/private_files/ | 1000/hour | n/a |

## Best Practices to Avoid Throttling

To ensure smooth integration and minimize the risk of encountering throttle limit errors, consider the following recommendations:

- **Monitor Your API Usage:** Regularly track the frequency and volume of your API calls. Awareness of your consumption patterns helps you adjust your integration proactively.
- **Optimize Your Integration:** Evaluate your API integration for any opportunities to reduce unnecessary calls. Consider batching requests, implementing caching strategies, or reviewing endpoints for efficiency improvements.
- **Implement Robust Error Handling:** Build error-handling routines into your application that can gracefully manage rate limit responses. This might include automatic retries with exponential backoff or notifying your team when limits are reached.
- **Stay Informed:** Keep an eye on the latest API guidelines and documentation updates to ensure your usage aligns with current best practices.

## Reach Out for Assistance

For most partners these throttle limits are more than enough to meet their usage requirements. If you have further needs or queries about your usage, we can review your usage and discuss options:

- **Enterprise Infrastructure Pro Service (paid service):** Increasing your throttle limits if your application's requirements justify a higher threshold.
- **API Technical Support:** Offering support from OpenSolar's API expert to further optimize your API integration and clarify any technical issues.

[Talk to our Pro Services Expert](https://www.opensolar.com/pro-services/)

> **Note:**
>
> Our throttle limits are periodically reviewed and may be adjusted to reflect evolving usage patterns and to further enhance both security and performance. We encourage you to regularly consult the latest API documentation for updates on rate limiting policies.
