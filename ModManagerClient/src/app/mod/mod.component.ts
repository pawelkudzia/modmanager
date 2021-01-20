import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Game } from '../contracts/game';
import { Mod } from '../contracts/mod';
import { GameService } from '../services/game.service';
import { ModService } from '../services/mod.service';

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.css']
})
export class ModComponent implements OnInit {
  modId: string;
  response = null;
  error = null;
  mod: Mod;
  game: Game;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _modService: ModService,
    private _gameService: GameService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => this.modId = params['id']);

    this._modService.getMod(this.modId).subscribe(
      response => {
        this.response = response;
        this.mod = this.response.data.mod;

        this._gameService.getGame(this.mod.game).subscribe(
          response => {
            this.response = response;
            this.game = this.response.data.game;
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

  closeErrorAlert() {
    this.error = null;
  }

}
