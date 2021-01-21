# Backend Architecture

ModManager uses [Express](https://expressjs.com/) for creating REST Web API which can be consumed by any HTTP client. In this document you can find out information about overall project structure. For API details you should visit [API](https://github.com/pawelkudzia/modmanager/blob/feature/docs/API.md) document.

## Project Structure

Everything what you need if it comes to backend is located in `modmanager` directory. In `src` directory you can find following directories (all of these have proper JavaScript files):
* controllers – endpoint handlers and controller object for authentication, Game, Mod and User resources
* dev – contains script for populating sample data to database, also sample JSON data
* models – mongoose models for Game, Mod and User resources
* routes – routers for Game, Mod, User resources and also there is Test router
* utils – additional scripts such as API actions, AppError class or helper function

Also there is JavaScript file: `app.js` which is entry point of the backend application.

## Explaining app.js

To make it easy to understand `app.js` file can be splitted into 6 sections. Before them, proper package imports are made.

### First Section: app init

```js
// app init
dotenv.config({ path: './config.env' });
const app = express();
const PORT = process.env.PORT || 8080;
```

Config file is imported, express application is created and port value is assigned. If port value is not specified then 8080 is used instead.

### Second Section: database

```js
// database
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to database!'));
```

It is simple database connection to MongoDB database by using [mongoose](https://mongoosejs.com/). Default values are used.

### Third Section: middleware

```js
// middleware
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
```

Express provides easy to use middlewares. Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. Middleware functions can perform the following tasks:
* Execute any code
* Make changes to the request and the response objects
* End the request-response cycle
* Call the next middleware function in the stack

`express.json()` middleware allows accepting JSON data which can be sent from client application (Angular, Postman etc.).

`cors()` middleware allows to use our API not only in our server.

`morgan('dev')` middleware allows logging data in backend application and can be only used in development mode.

### Fourth section: api

```js
// api
app.use('/api/v1/test', testRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/games', gameRouter);
app.use('/api/v1/mods', modRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});
```

Endpoints for REST Web API and routers which are responsible for handling these endpoints. Also there is used special middleware which accepts every route which are not matched. The code:

```js
next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
```

in Express allows for triggering `global error handling middleware` which is described in next section.

### Fifth section: global error handling middleware

```js
// global error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});
```

This should have be the last one middleware and as the first argument it takes `err` object which data is used in response.

### Sixth section: server

```js
// server
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}.`));
```

It simply starts the HTTP server listening for connections on given PORT.
