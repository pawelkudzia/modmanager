# Getting Started

First of all make sure you completed installation process which is mentioned in [README.md](https://github.com/pawelkudzia/modmanager) of this repository. Before running both backend and frontend applications you can use `data.js` script for populating database. The script is located in `modmanager\src\dev` directory and also there are JSON files which contain sample data for users and games.

For importing all sample data you can run command:

```node ./src/dev/data.js --import```

For deleting all sample data you can run command:

```node ./src/dev/data.js --delete```

You can find these and also additional commands in `modmanager/commands.txt` file.


## User Data

Before using the application it is important to know that only users with `admin` role can add, edit or delete Game resources. Users with `user` role can only add, edit or delete Mod resources. Sample user data can look like this:

```json
[
    {
        "role": "admin",
        "name": "admin",
        "email": "admin@example.com",
        "password": "12345678",
        "passwordConfirm": "12345678"
    },
    {
        "role": "user",
        "name": "user",
        "email": "user@example.com",
        "password": "12345678",
        "passwordConfirm": "12345678"
    }
]
```

Each User must have key-value pairs: role, name, email, password and passwordConfirm. By running `data.js` script you can create collections in your MongoDB database. Keep in mind that in database there will be stored only: role, name, email and password (as hash) because passwordConfirm will be not stored – it is only used for validating input provided by user before sending these to the backend application.

## Game Data

Each Game must have key-value pairs: name, description, genre, developer, engine and platforms. By running `data.js` script you can create collections in your MongoDB database. In database there will be stored all of these key-value pairs.

```json
[
    {
        "name": "Amazing Game",
        "description": "This is description for amazing game.",
        "genre": "Action",
        "developer": "Amazing Dev",
        "engine": "Amazing Engine",
        "platforms": ["Windows", "Linux", "macOS"]
    }
]
```

## Mod Data

Each Mod must have key-value pairs: name, description, author, and game. The game key contains reference (ObjectId) to given Game from games collection. By running `data.js` script you can create collections in your MongoDB database. In database there will be stored all of these key-value pairs.

The sample Mod data is not provided because each Mod resource depends on Game resource and I did not want to extending `data.js` script for retrieving sample ObjectId and then adding sample Mods based on that ID. Actually, it is not necessary for now because you can easily add new Mod via frontend application or [Postman](https://www.postman.com/) which is used for testing APIs.


## What You Should Know

Apart of basic knowledge about all mentioned stuff (Node.js, Express, Angular, general programming skills etc.) you should also be familiar with:
* [mongoose](https://mongoosejs.com/) – is Object Data Modeling tool for interacting with MongoDB database same way as you can use ORM tools with relational databases
* [Bootstrap](https://getbootstrap.com/) – is CSS framework for building responsive websites and interfaces

If you know about all of these then you can easily jump into next section of this documentation.
