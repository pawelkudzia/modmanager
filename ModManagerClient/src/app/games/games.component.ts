import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from '../contracts/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  submitted: boolean = false;
  addGameForm: FormGroup;

  genres: string[] = [
    'Action', 'Adventure', 'Role-playing', 'Shooter', 'Simulation', 'Sports', 'Strategy', 'Misc'
  ];

  platformStrings: string[] = [
    'Windows', 'Linux', 'macOS'
  ];

  response = null;
  error = null;
  games: Game[] = [];

  constructor(
    private _fb: FormBuilder,
    private _gameService: GameService
  ) { }

  get name(): AbstractControl {
    return this.addGameForm.get('name');
  }

  get description(): AbstractControl {
    return this.addGameForm.get('description');
  }

  get genre(): AbstractControl {
    return this.addGameForm.get('genre');
  }

  get developer(): AbstractControl {
    return this.addGameForm.get('developer');
  }

  get engine(): AbstractControl {
    return this.addGameForm.get('engine');
  }

  get platforms(): AbstractControl {
    return this.addGameForm.get('platforms');
  }

  ngOnInit(): void {
    this.addGameForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      genre: [this.genres[0], Validators.required],
      developer: ['', [Validators.required, Validators.minLength(3)]],
      engine: ['', [Validators.required, Validators.minLength(3)]],
      platforms: ['', Validators.required]
    });

    this._gameService.getGames().subscribe(
      response => {
        this.response = response;
        this.games = this.response.data.games;
      },
      error => this.error = error
    );
  }

  onSubmit() {
    this.submitted = true;
    console.log('data was submitted!');

    const value = this.addGameForm.value;

    const newGame: Game = {
      _id: null,
      name: value.name,
      description: value.description,
      genre: value.genre,
      developer: value.developer,
      engine: value.engine,
      platforms: value.platforms
    };

    this._gameService.addGame(newGame).subscribe(
      response => this.response = response,
      error => this.error = error
    );
  }

  newForm() {
    this.submitted = false;
    this.addGameForm.reset({ genre: this.genres[0] });
  }

}
