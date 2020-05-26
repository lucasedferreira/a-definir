import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    showHeaderAndFooter = true;

    constructor(private router: Router) {
        router.events.subscribe(event => {
            console.log('router.url', router.url);
            if(router.url === '/login') {
                this.showHeaderAndFooter = false;
            }else {
                this.showHeaderAndFooter = true;
            }
        });
    }
}