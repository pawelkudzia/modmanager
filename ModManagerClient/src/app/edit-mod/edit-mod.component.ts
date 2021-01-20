import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mod } from '../contracts/mod';
import { ModService } from '../services/mod.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-edit-mod',
  templateUrl: './edit-mod.component.html',
  styleUrls: ['./edit-mod.component.css']
})
export class EditModComponent implements OnInit {
  submitted: boolean = false;
  editModForm: FormGroup;

  games = [];

  modId: string;
  response = null;
  error = null;
  mod: Mod;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _modService: ModService,
    private _gameService: GameService
  ) { }

  get name(): AbstractControl {
    return this.editModForm.get('name');
  }

  get description(): AbstractControl {
    return this.editModForm.get('description');
  }

  get game(): AbstractControl {
    return this.editModForm.get('game');
  }

  get author(): AbstractControl {
    return this.editModForm.get('author');
  }

  ngOnInit(): void {
    this.editModForm = this._fb.group({
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

    this._route.params.subscribe(params => this.modId = params['id']);

    this._modService.getMod(this.modId).subscribe(
      response => {
        this.response = response;
        this.mod = this.response.data.mod;

        this.editModForm.patchValue({
          name: this.mod.name,
          description: this.mod.description,
          game: this.mod.game,
          author: this.mod.author
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

    const value = this.editModForm.value;

    const newMod: Mod = {
      _id: this.modId,
      name: value.name,
      description: value.description,
      game: value.game,
      author: value.author
    };

    this._modService.updateMod(newMod).subscribe(
      response => this.response = response,
      error => {
        this.error = error;
        this.newForm();
      }
    );
  }

  newForm() {
    this.submitted = false;

    this._modService.getMod(this.modId).subscribe(
      response => {
        this.response = response;
        this.mod = this.response.data.mod;
        this.editModForm.reset(this.mod);
      },
      error => this.error = error
    );
  }

  closeErrorAlert() {
    this.error = null;
  }

  deleteMod() {
    this._modService.deleteMod(this.modId).subscribe(
      response => {
        let modalCloseButton = document.getElementById('exampleModalCloseBtn');
        let event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        modalCloseButton.dispatchEvent(event);

        this._router.navigate(['/mods']);
      },
      error => this.error = error
    );
  }

}
