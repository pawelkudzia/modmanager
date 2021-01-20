import { Component, OnInit } from '@angular/core';
import { User } from '../contracts/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'ModManagerClient';
  loggedIn: boolean;

  response = null;
  error = null;
  user: User;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.authService.logoutUser();
  }

}
