import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../contracts/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _registerUrl: string = 'http://localhost:8080/api/v1/users/register';
  _loginUrl: string = 'http://localhost:8080/api/v1/users/login';

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  registerUser(user): Observable<User> {
    return this._http.post<User>(this._registerUrl, user);
  }

  loginUser(user): Observable<User> {
    return this._http.post<User>(this._loginUrl, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  getLoggedInUser() {
    return localStorage.getItem('user');
  }

}
