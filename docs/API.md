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

```GET /api/v1/users```

Response (no JWT):
```json
{
    "status": "fail",
    "message": "Unauthorized Error!"
}
```

Response (Authorization: Bearer <JWT>):
```json
{
    "status": "success",
    "results": 2,
    "data": {
        "users": [
            {
                "role": "user",
                "_id": "600afa3fbe14c119f4f707d8",
                "name": "user",
                "email": "user@example.com",
                "createdAt": "2021-01-22T16:15:59.274Z",
                "updatedAt": "2021-01-22T16:15:59.274Z"
            },
            {
                "role": "admin",
                "_id": "600afa3fbe14c119f4f707d7",
                "name": "admin",
                "email": "admin@example.com",
                "createdAt": "2021-01-22T16:15:59.273Z",
                "updatedAt": "2021-01-22T16:15:59.273Z"
            }
        ]
    }
}
```

```POST /api/v1/users/register```

Response:
```json

```

```GET /api/v1/users/:id```

Response (no JWT):
```json
{
    "status": "fail",
    "message": "Unauthorized Error!"
}
```

Response (Authorization: Bearer <JWT>):
```json
{
    "status": "success",
    "data": {
        "user": {
            "role": "admin",
            "_id": "600afa3fbe14c119f4f707d7",
            "name": "admin",
            "email": "admin@example.com",
            "createdAt": "2021-01-22T16:15:59.273Z",
            "updatedAt": "2021-01-22T16:15:59.273Z",
            "__v": 0
        }
    }
}
```

```POST /api/v1/users/login```

Body:
```json
{
    "email": "admin@example.com",
    "password": "12345678"
}
```

Response:
```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMGFmYTNmYmUxNGMxMTlmNGY3MDdkNyIsImlhdCI6MTYxMTMzMzA0NSwiZXhwIjoxNjExNDE5NDQ1fQ.pQXqAIYrD78H2w87Tg-AD6c2UVUp6y6vCtgIP94VMbI",
    "data": {
        "user": {
            "role": "admin",
            "_id": "600afa3fbe14c119f4f707d7",
            "name": "admin",
            "email": "admin@example.com",
            "createdAt": "2021-01-22T16:15:59.273Z",
            "updatedAt": "2021-01-22T16:15:59.273Z",
            "__v": 0
        }
    }
}
```

```GET /api/v1/games```

Response (no JWT):
```json
{
    "status": "fail",
    "message": "Unauthorized Error!"
}
```

Response (Authorization: Bearer <JWT>):
```json
{
    "status": "success",
    "results": 4,
    "data": {
        "games": [
            {
                "genre": "Role-playing",
                "_id": "600afb9fbec8c91aa86e20fb",
                "name": "Cyberpunk 2077",
                "description": "Action role-playing video game developed and published by CD Projekt. The story takes place in Night City, an open world set in the Cyberpunk universe.",
                "developer": "CD Projekt Red",
                "engine": "REDengine 4",
                "platforms": [
                    "Windows"
                ],
                "createdAt": "2021-01-22T16:21:51.913Z",
                "updatedAt": "2021-01-22T16:21:51.913Z"
            },
            {
                "genre": "Role-playing",
                "_id": "600afb89bec8c91aa86e20fa",
                "name": "The Witcher 3: Wild Hunt",
                "description": "Action role-playing game developed and published by Polish developer CD Projekt Red and is based on The Witcher series of fantasy novels written by Andrzej Sapkowski.",
                "developer": "CD Projekt Red",
                "engine": "REDengine 3",
                "platforms": [
                    "Windows"
                ],
                "createdAt": "2021-01-22T16:21:29.984Z",
                "updatedAt": "2021-01-22T16:21:29.984Z"
            },
            {
                "genre": "Role-playing",
                "_id": "600afb72bec8c91aa86e20f9",
                "name": "Fallout: New Vegas",
                "description": "A post-apocalyptic action role-playing video game developed by Obsidian Entertainment and published by Bethesda Softworks.",
                "developer": "Obsidian Entertainment",
                "engine": "Gamebryo",
                "platforms": [
                    "Windows"
                ],
                "createdAt": "2021-01-22T16:21:06.427Z",
                "updatedAt": "2021-01-22T16:21:06.427Z"
            },
            {
                "genre": "Action",
                "_id": "600afa40be14c119f4f707d9",
                "name": "Amazing Game",
                "description": "This is description for amazing game.",
                "developer": "Amazing Dev",
                "engine": "Amazing Engine",
                "platforms": [
                    "Windows",
                    "Linux",
                    "macOS"
                ],
                "createdAt": "2021-01-22T16:16:00.577Z",
                "updatedAt": "2021-01-22T16:16:00.577Z"
            }
        ]
    }
}
```

```POST /api/v1/games```

Body:
```json
{
    "name": "New Game",
    "description": "Description for new game."
}
```

Response (no JWT):
```json
{
    "status": "fail",
    "message": "Unauthorized Error!"
}
```

Response (Authorization: Bearer <JWT>):
```json
{
    "status": "success",
    "data": {
        "newGame": {
            "genre": "Misc",
            "_id": "600b0018bec8c91aa86e20fe",
            "name": "New Game",
            "description": "Description for new game.",
            "createdAt": "2021-01-22T16:40:56.381Z",
            "updatedAt": "2021-01-22T16:40:56.381Z",
            "__v": 0
        }
    }
}
```

```GET /api/v1/games/:id```

Response (no JWT):
```json
{
    "status": "fail",
    "message": "Unauthorized Error!"
}
```

Response (Authorization: Bearer <JWT>):
```json
{
    "status": "success",
    "data": {
        "game": {
            "genre": "Role-playing",
            "_id": "600afb89bec8c91aa86e20fa",
            "name": "The Witcher 3: Wild Hunt",
            "description": "Action role-playing game developed and published by Polish developer CD Projekt Red and is based on The Witcher series of fantasy novels written by Andrzej Sapkowski.",
            "developer": "CD Projekt Red",
            "engine": "REDengine 3",
            "platforms": [
                "Windows"
            ],
            "createdAt": "2021-01-22T16:21:29.984Z",
            "updatedAt": "2021-01-22T16:21:29.984Z",
            "__v": 0
        }
    }
}
```

```PATCH /api/v1/games/:id```

Body:
```json
{
    "name": "New Game Updated",
    "platforms": ["Windows", "Linux", "macOS"]
}
```

Response (no JWT):
```json
{
    "status": "fail",
    "message": "Unauthorized Error!"
}
```

Response (Authorization: Bearer <JWT>):
```json
{
    "status": "success",
    "data": {
        "game": {
            "genre": "Misc",
            "_id": "600b0018bec8c91aa86e20fe",
            "name": "New Game Updated",
            "description": "Description for new game.",
            "createdAt": "2021-01-22T16:40:56.381Z",
            "updatedAt": "2021-01-22T16:43:02.010Z",
            "__v": 0,
            "platforms": [
                "Windows",
                "Linux",
                "macOS"
            ]
        }
    }
}
```

```DELETE /api/v1/games/:id```

Response (no JWT):
```json
{
    "status": "fail",
    "message": "Unauthorized Error!"
}
```

Response (Authorization: Bearer <JWT>):
204 No Content

```GET /api/v1/mods```

Response (no JWT):
```json
{
    "status": "fail",
    "message": "Unauthorized Error!"
}
```

Response (Authorization: Bearer <JWT>):
```json
{
    "status": "success",
    "results": 2,
    "data": {
        "mods": [
            {
                "_id": "600afc64bec8c91aa86e20fd",
                "name": "Fallout - The Frontier",
                "description": "Fallout: The Frontier is a gigantic DLC/New Game. As the “Courier” you start a new adventure centered around a conflict between the NCR and the Legion in the snow blasted remains of Portland Oregon. Featuring 3 major questlines, 60+ side quests, hundreds of new armours, weapons and items, and tens of thousands of lines of new voiced dialogue!",
                "author": "The Frontier Team",
                "game": "600afb72bec8c91aa86e20f9",
                "createdAt": "2021-01-22T16:25:08.897Z",
                "updatedAt": "2021-01-22T16:25:08.897Z"
            },
            {
                "_id": "600afbf3bec8c91aa86e20fc",
                "name": "Random Encounters Reworked",
                "description": "Ever felt the game could use more random encounters? This mod takes care of that. It adds random monster spawns, dynamic & randomly generated monster contracts, random monster hunts and monster ambushes. Also adds events based on your actions.",
                "author": "Aeltoth",
                "game": "600afb89bec8c91aa86e20fa",
                "createdAt": "2021-01-22T16:23:15.939Z",
                "updatedAt": "2021-01-22T16:23:15.939Z"
            }
        ]
    }
}
```

```POST /api/v1/mods```

Body:
```json
{
    "name": "New Mod",
    "description": "Description for new mod.",
    "game": "600b0018bec8c91aa86e20fe"
}
```

Response (no JWT):
```json
{
    "status": "fail",
    "message": "Unauthorized Error!"
}
```

Response (Authorization: Bearer <JWT>):
```json
{
    "status": "success",
    "data": {
        "newMod": {
            "_id": "600b0250bec8c91aa86e2100",
            "name": "New Mod",
            "description": "Description for new mod.",
            "author": "XYZ",
            "game": "600b0018bec8c91aa86e20fe",
            "createdAt": "2021-01-22T16:50:24.188Z",
            "updatedAt": "2021-01-22T16:50:24.188Z",
            "__v": 0
        }
    }
}
```

```GET /api/v1/mods/:id```

Response (no JWT):
```json
{
    "status": "fail",
    "message": "Unauthorized Error!"
}
```

Response (Authorization: Bearer <JWT>):
```json
{
    "status": "success",
    "data": {
        "mod": {
            "_id": "600afbf3bec8c91aa86e20fc",
            "name": "Random Encounters Reworked",
            "description": "Ever felt the game could use more random encounters? This mod takes care of that. It adds random monster spawns, dynamic & randomly generated monster contracts, random monster hunts and monster ambushes. Also adds events based on your actions.",
            "author": "Aeltoth",
            "game": "600afb89bec8c91aa86e20fa",
            "createdAt": "2021-01-22T16:23:15.939Z",
            "updatedAt": "2021-01-22T16:23:15.939Z",
            "__v": 0
        }
    }
}
```

```PATCH /api/v1/mods/:id```

Body:
```json
{
    "name": "New Mod Updated",
    "description": "Description for new mod.",
    "author": "XYZ",
    "game": "600b0018bec8c91aa86e20fe"
}
```

Response (no JWT):
```json
{
    "status": "fail",
    "message": "Unauthorized Error!"
}
```

Response (Authorization: Bearer <JWT>):
```json
{
    "status": "success",
    "data": {
        "mod": {
            "_id": "600b0250bec8c91aa86e2100",
            "name": "New Mod Updated",
            "description": "Description for new mod.",
            "author": "XYZ",
            "game": "600b0018bec8c91aa86e20fe",
            "createdAt": "2021-01-22T16:50:24.188Z",
            "updatedAt": "2021-01-22T16:52:18.944Z",
            "__v": 0
        }
    }
}
```

```DELETE /api/v1/mods/:id```

Response (no JWT):
```json
{
    "status": "fail",
    "message": "Unauthorized Error!"
}
```

Response (Authorization: Bearer <JWT>):
204 No Content

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
