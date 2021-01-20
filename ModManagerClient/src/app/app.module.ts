import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GamesComponent } from './games/games.component';
import { ModsComponent } from './mods/mods.component';
import { GameComponent } from './game/game.component';
import { ModComponent } from './mod/mod.component';
import { AddGameComponent } from './add-game/add-game.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { AddModComponent } from './add-mod/add-mod.component';
import { EditModComponent } from './edit-mod/edit-mod.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ModService } from './services/mod.service';
import { GameService } from './services/game.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavbarComponent,
    GamesComponent,
    ModsComponent,
    GameComponent,
    ModComponent,
    AddGameComponent,
    EditGameComponent,
    AddModComponent,
    EditModComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule
  ],
  providers: [GameService, ModService, AuthService, AuthGuard, GuestGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
