import { Component, OnInit } from '@angular/core';
import { Game } from '../contracts/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  response = null;
  error = null;
  games: Game[] = [];

  constructor(private _gameService: GameService) { }

  ngOnInit(): void {
    this._gameService.getGames().subscribe(
      response => {
        this.response = response;
        this.games = this.response.data.games;
      },
      error => this.error = error
    );
  }

}
