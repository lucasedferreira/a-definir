import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    users: User[] = [];
    isLogged: boolean = false;

    constructor(private userService: UserService,
                private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.isLogged = this.authenticationService.isLogged()
        if(this.isLogged) {
            this.userService.getAll().pipe(first()).subscribe(users => {
                this.users = users;
            });
        }
    }
}