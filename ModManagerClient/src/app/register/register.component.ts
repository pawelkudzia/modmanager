import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from 'src/validators/password.validator';
import { User } from '../contracts/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  registerForm: FormGroup;

  response = null;
  error = null;
  user: User;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

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

    const newUser = this.registerForm.value;
    console.log(newUser);

    this._authService.registerUser(newUser).subscribe(
      response => {
        this.response = response;
        this.user = this.response.data.user;

        localStorage.setItem('token', this.response.token);

        console.log('response');
        console.log(this.response);
        console.log('user');
        console.log(this.user);
        this._router.navigate(['/']);
      },
      error => {
        this.error = error;
        this.newForm();
      }
    );
  }

  newForm() {
    this.submitted = false;
    this.registerForm.reset();
  }

  closeErrorAlert() {
    this.error = null;
  }

}
