import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Game } from '../contracts/game';
import { GameService } from '../services/game.service';

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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _gameService: GameService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => this.gameId = params['id']);

    this._gameService.getGame(this.gameId).subscribe(
      response => {
        this.response = response;
        this.game = this.response.data.game;
      },
      error => {
        this.error = error;
        this._router.navigate(['/404']);
      }
    );
  }

}
