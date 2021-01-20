import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Game } from '../contracts/game';
import { Mod } from '../contracts/mod';
import { GameService } from '../services/game.service';
import { ModService } from '../services/mod.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameId: string;
  response = null;
  error = null;
  game: Game;
  mods: Mod[] = [];

  page = 1;
  pageSize = 5;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _gameService: GameService,
    private _modService: ModService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => this.gameId = params['id']);

    this._gameService.getGame(this.gameId).subscribe(
      response => {
        this.response = response;
        this.game = this.response.data.game;

        this._modService.getModsForGame(this.gameId).subscribe(
          response => {
            this.response = response;
            this.mods = this.response.data.mods;
          },
          error => {
            this.error = error;
            this._router.navigate(['/404']);
          }
        );
      },
      error => {
        this.error = error;
        this._router.navigate(['/404']);
      }
    );
  }

}
