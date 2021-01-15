import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  registerForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  get name(): AbstractControl {
    return this.registerForm.get('name');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  get passwordConfirm(): AbstractControl {
    return this.registerForm.get('passwordConfirm');
  }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
    }, { validator: PasswordValidator });
  }

  onSubmit() {
    this.submitted = true;
    console.log('data was submitted!');
    console.log(this.registerForm);
  }

  newForm() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
