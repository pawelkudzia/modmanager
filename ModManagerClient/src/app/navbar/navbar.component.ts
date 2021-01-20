import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'ModManagerClient';
  loggedIn: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.authService.logoutUser();
  }

}
