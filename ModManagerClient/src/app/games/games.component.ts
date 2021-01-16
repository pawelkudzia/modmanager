import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private _fb: FormBuilder) { }

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
  }

  onSubmit() {
    this.submitted = true;
    console.log('data was submitted!');
    console.log(this.addGameForm);
  }

  newForm() {
    this.submitted = false;
    this.addGameForm.reset({ genre: this.genres[0] });
  }

}
