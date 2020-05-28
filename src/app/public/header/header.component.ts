import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services';
import { faPhoneAlt, faEnvelope, faUser, faSearch, faHeart, faShoppingCart, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  faEnvelope = faEnvelope;
  faPhone = faPhoneAlt;
  faUser = faUser;
  faSearch = faSearch;
  faHeart = faHeart;
  faShoppingCart = faShoppingCart;
  faTimes = faTimes;
  faBars = faBars;

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
