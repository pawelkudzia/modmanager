import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mod } from '../contracts/mod';
import { GameService } from '../services/game.service';
import { ModService } from '../services/mod.service';

@Component({
  selector: 'app-add-mod',
  templateUrl: './add-mod.component.html',
  styleUrls: ['./add-mod.component.css']
})
export class AddModComponent implements OnInit {
  submitted: boolean = false;
  addModForm: FormGroup;

  games = [];

  response = null;
  error = null;

  constructor(
    private _fb: FormBuilder,
    private _modService: ModService,
    private _gameService: GameService
  ) { }

  get name(): AbstractControl {
    return this.addModForm.get('name');
  }

  get description(): AbstractControl {
    return this.addModForm.get('description');
  }

  get game(): AbstractControl {
    return this.addModForm.get('game');
  }

  get author(): AbstractControl {
    return this.addModForm.get('author');
  }

  ngOnInit(): void {
    this.addModForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      game: [this.games[0], Validators.required],
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
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
    this.error = null;
    this.submitted = true;
    console.log('data was submitted!');

    const value = this.addModForm.value;

    const newMod: Mod = {
      _id: null,
      name: value.name,
      description: value.description,
      game: value.game,
      author: value.author
    };

    this._modService.addMod(newMod).subscribe(
      response => this.response = response,
      error => {
        this.error = error;
        this.newForm();
      }
    );
  }

  newForm() {
    this.submitted = false;
    this.addModForm.reset({ games: this.games[0] });
  }

}
