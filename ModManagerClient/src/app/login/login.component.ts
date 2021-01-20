import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../contracts/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  loginForm: FormGroup;

  response = null;
  error = null;
  user: User;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log('data was submitted!');

    const newUser = this.loginForm.value;
    console.log(newUser);

    this._authService.loginUser(newUser).subscribe(
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
        this.error = error,
        this.newForm();
      }
    );
  }

  newForm() {
    this.submitted = false;
    this.loginForm.reset();
  }

  closeErrorAlert() {
    this.error = null;
  }

}
