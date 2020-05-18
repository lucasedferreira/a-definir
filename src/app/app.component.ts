import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
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