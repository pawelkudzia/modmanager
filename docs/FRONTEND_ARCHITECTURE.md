# Frontend Architecture

ModManager uses [Angular](https://angular.io/) for creating client application which can consume REST Web API. In this document you can find out information about overall project structure.

## Project Structure

Everything what you need if it comes to backend is located in `ModManagerClient` directory. It is standard Angular application which was generated by [Angular CLI](https://angular.io/cli). The application files are located in `ModManagerClient/src/app` directory and contains following directories:
* add-game – component which displays form used for adding Game
* add-mod – component which displays form used for adding Mod
* contracts – interfaces which is used for casting data from HTTP response
* edit-game – component which displays form used for editing Game
* edit-mod – component which displays form used for editing Mod
* game – component which displays information about specific Game
* games – component which displays information about Games
* guards – guards wich are used for protected routes
* home – component which displays information in Home view 
* interceptors – services which are used for modifying HTTP requests
* login – component which displays form used for logging in to application
* mod – component which displays information about specific Mod
* mods – component which displays information about Mods
* navbar – component which displays navigation bar
* page-not-found – component which displays error page
* register – component which displays form used for registering new user accounts
* services – services which are used for sending HTTP requests

## Routes

Application routes are located in `app-routing.module.ts` file.


## AppComponent

AppComponent contains only 2 elements:
```html
<app-navbar></app-navbar>
<router-outlet></router-outlet>
```

`<app-navbar></app-navbar>` is used for displaying navbar component while the `<router-outlet></router-outlet>` is Angular component used by router. It acts as a placeholder that Angular dynamically fills based on the current router state.


## Modules

You can find all modules imports in `app.module.ts` file. The application uses following modules:
* BrowserModule
* AppRoutingModule
* ReactiveFormsModule
* HttpClientModule
* NgbPaginationModule
* ChartsModule


## Services

You can find all services imports in `app.module.ts` file. The application uses following services:
* GameService
* ModService
* AuthService
* AuthGuard
* GuestGuard
* TokenInterceptorService

### Additional Packages

ModManagerClient uses additional packages which are used for doing specific tasks:

* [ng-bootstrap](https://ng-bootstrap.github.io/#/home) – from this package only `NgbPaginationModule` module is used for creating pagination
* [ng2-charts](https://valor-software.com/ng2-charts/) – provides [Chart.js](https://www.chartjs.org/) components for Angular applications