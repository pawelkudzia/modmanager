# API

ModManager uses [Express](https://expressjs.com/) for creating REST Web API which can be consumed by any HTTP client. In this document you can find out information about endpoints.

## Examples

For testing API you can use any HTTP client, e.g. [Postman](https://www.postman.com/). All data is sent and received as JSON. Authentication is made by using [JSON Web Token](https://jwt.io/). Remember to send JSON Web Token within request if you want to get access to protected routes.

```GET /api/v1/test```

Response:
```json
{
    "status": "success",
    "message": "API is working: /api/v1/test."
}
```

```POST /api/v1/users/register```

Body:
```json
{
    "name": "tester",
    "email": "tester@example.com",
    "password": "12345678",
    "passwordConfirm": "12345678"
}
```

```POST /api/v1/users/login```

Response:
```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDlkZmI4NGI4MTgxMTgwNDljMWRlYiIsImlhdCI6MTYxMTI2MDY0OCwiZXhwIjoxNjExMzQ3MDQ4fQ.v7GsFLYPJq_VRSb3dZETLlwJ1AehWE6f_rJTALcIa00",
    "data": {
        "user": {
            "role": "admin",
            "_id": "6009dfb84b818118049c1deb",
            "name": "admin",
            "email": "admin@example.com",
            "createdAt": "2021-01-21T20:10:32.025Z",
            "updatedAt": "2021-01-21T20:10:32.025Z",
            "__v": 0
        }
    }
}
```

```GET /api/v1/users```

Response:
```json
{
    "status": "success",
    "results": 3,
    "data": {
        "users": [
            {
                "role": "user",
                "_id": "6009e0fc680ba61d7ce1e600",
                "name": "dev",
                "email": "dev@example.com",
                "createdAt": "2021-01-21T20:15:56.518Z",
                "updatedAt": "2021-01-21T20:15:56.518Z"
            },
            {
                "role": "user",
                "_id": "6009dfb84b818118049c1dec",
                "name": "user",
                "email": "user@example.com",
                "createdAt": "2021-01-21T20:10:32.026Z",
                "updatedAt": "2021-01-21T20:10:32.026Z"
            },
            {
                "role": "admin",
                "_id": "6009dfb84b818118049c1deb",
                "name": "admin",
                "email": "admin@example.com",
                "createdAt": "2021-01-21T20:10:32.025Z",
                "updatedAt": "2021-01-21T20:10:32.025Z"
            }
        ]
    }
}
```

## Endpoints

List of all endpoints:

```GET /api/v1/test```

```GET /api/v1/users```

```POST /api/v1/users/register```

```GET /api/v1/users/:id```

```POST /api/v1/users/login```

```GET /api/v1/games```

```POST /api/v1/games```

```GET /api/v1/games/:id```

```PATCH /api/v1/games/:id```

```DELETE /api/v1/games/:id```

```GET /api/v1/mods```

```POST /api/v1/mods```

```GET /api/v1/mods/:id```

```PATCH /api/v1/mods/:id```

```DELETE /api/v1/mods/:id```

In this version of application `:id` is simply `ObjectId` (string) used by MongoDB.
