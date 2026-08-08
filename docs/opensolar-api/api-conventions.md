# API Conventions

## Overview

The API follows standard Django REST Framework conventions

> **Warning:**
>
> Trailing slashes '/' are enforced on all API methods aside from `GET` requests

## Lists and Pagination

For endpoints using the `list` fieldset, these standard params can be applied.

- **limit** - Amount of records per page.
- **page** - The page to load
- **range** - A URL encoded represention of the record range requested (e.g. `[0,19]` encoded as `%5B0%2C19%5D`)
- **ordering** - The field to sort on, prepended by a minus (`-`) for ascending order (e.g. `ordering: -id`)
