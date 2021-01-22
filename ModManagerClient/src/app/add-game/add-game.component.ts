import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from '../contracts/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
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
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      genre: [this.genres[0], Validators.required],
      developer: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      engine: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      platforms: ['', Validators.required]
    });
  }

  onSubmit() {
    this.error = null;
    this.submitted = true;

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
      error => {
        this.error = error;
        this.newForm();
      }
    );
  }

  newForm() {
    this.submitted = false;
    this.addGameForm.reset({ genre: this.genres[0] });
  }

  closeErrorAlert() {
    this.error = null;
  }

}
