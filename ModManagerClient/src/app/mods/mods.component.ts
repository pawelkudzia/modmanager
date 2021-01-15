import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mods',
  templateUrl: './mods.component.html',
  styleUrls: ['./mods.component.css']
})
export class ModsComponent implements OnInit {
  submitted: boolean = false;
  addModForm: FormGroup;

  games: string[] = [
    'Game 1', 'Game 2'
  ];

  constructor(private _fb: FormBuilder) { }

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
      author: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log('data was submitted!');
    console.log(this.addModForm);
  }

  newForm() {
    this.submitted = false;
    this.addModForm.reset();
  }

}
