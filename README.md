# modmanager

ModManager is REST Web API and SPA which allow users to manage their games and mods library.

For backend [Express](https://expressjs.com/) is used, while [Angular](https://angular.io/) is used for frontend.

## Installation

To use and develop ModManager you have to install [Node.js](https://nodejs.org/en/) which includes [Node Package Manager](https://www.npmjs.com/get-npm). Also, you should install [Angular](https://angular.io/) especially [Angular CLI](https://angular.io/cli).

Also, you should have installed [MongoDB](https://www.mongodb.com/) database on your localhost or use cloud etc. ModManager uses MongoDB for storing all the data (users, games, mods).

To check that you have node installed you can use command:

```node --version```

To check that you have npm installed you can use command:

```npm --version```

To check that you have Angular CLI installed you can use command:

```ng --version```

Make sure you follow official instructions for installing mentioned tools.

After that you can clone or download ModManager repository (master branch), then go to root directory:

```cd modmanager```

and run command:

```npm install```

Next, you should navigate to client application directory:

```cd ModManagerClient```

and also run command:

```npm install```

Next step is creating `config.env` file where you can store environment variables. Put `config.env` file inside `modmanager` directory (this directory level where `src` directory or `package.json` file is located).

To run backend application you have to prepare database connection string, port and also [JSON Web Token](https://jwt.io/)'s stuff. Example `config.env` file can look like this:

```
NODE_ENV=development
PORT=8080
DATABASE_LOCAL=mongodb://localhost:27017/modmanager
JWT_SECRET=<YOUR SECRET KEY>
JWT_EXPIRES_IN=1d
JWT_COOKIE_EXPIRES_IN=1
```

Keep in mind that `JWT_SECRET` should contain preferably long and random string.

If there are not any errors you can run backend and frontend applications. To run backend application (Express) go to root directory:

```cd modmanager```

and run command:

```npm run dev```

To run frontend application (Angular) go to client application directory:

```cd ModManagerClient```

and run command:

```ng serve --open```

As you can see all of these commands are standard Node.js and Angular commands. For more detailed information you can visit official websites of these tools.

## Usage

ModManager can be used as simple games and mods web application aggregator which allows users to store and manage information about their favourites games and mods. Users can create new accounts, add basic information about games and mods for these games. Data is stored in NoSQL document database (in this case MongoDB).

## Features

The main features are:
* Register and Login User,
* Two types of user accounts (roles): Admin and User,
* Protected views (routes) which can be only accessed by logged in Users,
* Page Not Found view,
* Read Games list,
* Read Mods list,
* Create new Game,
* Update existing Game,
* Delete existing Game with all associated Mods,
* Create new Mod if there is at least 1 game available,
* Update existing Mod,
* Delete existing Mod,
* Forms validation and so on...

The project is playground for learning Express and Angular framework fundamentals. The project was also created because of the course at the university. This is not perfect and ready-to-use application, it needs code refactoring and many improvements but by developing ModManager I learnt fundamentals of mentioned frameworks.

## Documentation

You can get started with ModManager and find out more by using these links:
* [Getting Started](https://github.com/pawelkudzia/modmanager/blob/feature/docs/GETTING_STARTED.md)
* [Backend Architecture](https://github.com/pawelkudzia/modmanager/blob/feature/docs/BACKEND_ARCHITECTURE.md)
* [Frontend Architecture](https://github.com/pawelkudzia/modmanager/blob/feature/docs/FRONTEND_ARCHITECTURE.md)
* [API](https://github.com/pawelkudzia/modmanager/blob/feature/docs/API.md)
* [Showcase](https://github.com/pawelkudzia/modmanager/blob/feature/docs/SHOWCASE.md)

## Credits

[ModManager](https://github.com/pawelkudzia/modmanager) (this repository) by Paweł Kudzia.

[Express](https://expressjs.com/) by all its contributors.

[Angular](https://angular.io/) by [Google](https://about.google/).

## License

The ModManager is open-sourced software licensed under the [MIT](https://github.com/pawelkudzia/modmanager/blob/master/LICENSE) license.
