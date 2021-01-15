import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModComponent } from './mod/mod.component';
import { ModsComponent } from './mods/mods.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'games',
    component: GamesComponent
  },
  {
    path: 'mods',
    component: ModsComponent
  },
  {
    path: 'games/:id',
    component: GameComponent
  },
  {
    path: 'mods/:id',
    component: ModComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
