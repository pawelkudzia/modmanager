import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from '../contracts/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
  submitted: boolean = false;
  editGameForm: FormGroup;

  genres: string[] = [
    'Action', 'Adventure', 'Role-playing', 'Shooter', 'Simulation', 'Sports', 'Strategy', 'Misc'
  ];

  platformStrings: string[] = [
    'Windows', 'Linux', 'macOS'
  ];

  gameId: string;
  response = null;
  error = null;
  game: Game;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _gameService: GameService
  ) { }

  get name(): AbstractControl {
    return this.editGameForm.get('name');
  }

  get description(): AbstractControl {
    return this.editGameForm.get('description');
  }

  get genre(): AbstractControl {
    return this.editGameForm.get('genre');
  }

  get developer(): AbstractControl {
    return this.editGameForm.get('developer');
  }

  get engine(): AbstractControl {
    return this.editGameForm.get('engine');
  }

  get platforms(): AbstractControl {
    return this.editGameForm.get('platforms');
  }

  ngOnInit(): void {
    this.editGameForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      genre: [this.genres[0], Validators.required],
      developer: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      engine: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      platforms: ['', Validators.required]
    });

    this._route.params.subscribe(params => this.gameId = params['id']);

    this._gameService.getGame(this.gameId).subscribe(
      response => {
        this.response = response;
        this.game = this.response.data.game;

        this.editGameForm.patchValue({
          name: this.game.name,
          description: this.game.description,
          genre: this.game.genre,
          developer: this.game.developer,
          engine: this.game.engine,
          platforms: this.game.platforms
        });
      },
      error => {
        this.error = error;
        this._router.navigate(['/404']);
      }
    );
  }

  onSubmit() {
    this.error = null;
    this.submitted = true;
    console.log('data was submitted!');

    const value = this.editGameForm.value;

    const newGame: Game = {
      _id: this.gameId,
      name: value.name,
      description: value.description,
      genre: value.genre,
      developer: value.developer,
      engine: value.engine,
      platforms: value.platforms
    };

    this._gameService.updateGame(newGame).subscribe(
      response => this.response = response,
      error => {
        this.error = error;
        this.newForm();
      }
    );
  }

  newForm() {
    this.submitted = false;

    this._gameService.getGame(this.gameId).subscribe(
      response => {
        this.response = response;
        this.game = this.response.data.game;
        this.editGameForm.reset(this.game);
      },
      error => this.error = error
    );
  }

  deleteGame() {
    this._gameService.deleteGame(this.gameId).subscribe(
      response => {
        let modalCloseButton = document.getElementById('exampleModalCloseBtn');
        let event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        modalCloseButton.dispatchEvent(event);

        this._router.navigate(['/games']);
      },
      error => this.error = error
    );
  }

}
