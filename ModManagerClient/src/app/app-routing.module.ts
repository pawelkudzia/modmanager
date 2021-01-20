import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddGameComponent } from './add-game/add-game.component';
import { AddModComponent } from './add-mod/add-mod.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { EditModComponent } from './edit-mod/edit-mod.component';
import { GameComponent } from './game/game.component';
import { GamesComponent } from './games/games.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModComponent } from './mod/mod.component';
import { ModsComponent } from './mods/mods.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
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
    component: GamesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mods',
    component: ModsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'games/create',
    component: AddGameComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'games/:id/edit',
    component: EditGameComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'games/:id',
    component: GameComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mods/create',
    component: AddModComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mods/:id/edit',
    component: EditModComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mods/:id',
    component: ModComponent,
    canActivate: [AuthGuard]
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
