import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  isLogged: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.isLogged = authenticationService.isLogged();
  }

  logout() {
    this.authenticationService.logout();
    this.login();
  }

  login() {
    this.router.navigate(['/login']);
  }
}
