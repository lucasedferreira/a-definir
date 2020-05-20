import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Product, ShoppingCart } from '../_models';
import { UserService, AuthenticationService, ProductService } from '../_services';
import { Observable } from 'rxjs';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    users: User[] = [];
    isLogged: boolean = false;

    products: Product[] = [];
    cart: Observable<ShoppingCart>;

    constructor(private userService: UserService,
                private authenticationService: AuthenticationService,
                private productService: ProductService) { }

    ngOnInit() {
        this.isLogged = this.authenticationService.isLogged();
        if (this.isLogged) {
            this.userService.getAll().pipe(first()).subscribe(users => {
                this.users = users;
            });
        }

        this.productService.getAll().subscribe(products => {
            this.products = products;
            console.log('this.products', this.products);
        });
    }
}