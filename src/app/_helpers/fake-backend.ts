﻿import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User, Product, Category } from '../_models';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const users: User[] = [
            { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' },
            { id: 2, username: 'iuk', password: '123', firstName: 'Lucas', lastName: 'Eduardo' }
        ];

        const categories: Category[] = [
            { id: 1, name: 'women' },
            { id: 2, name: 'men' }
        ];

        const products: Product[] = [
            { id: 1, title: 'Produto 1', price: 19.99, category: 'women', imageUrl: 'https://colorlib.com/preview/theme/fashi/img/products/women-3.jpg' },
            { id: 2, title: 'Produto 2', price: 250, category: 'women', imageUrl: 'https://colorlib.com/preview/theme/fashi/img/products/women-1.jpg' },
            { id: 3, title: 'Produto 3', price: 30, category: 'women', imageUrl: 'https://colorlib.com/preview/theme/fashi/img/products/women-2.jpg' },
            { id: 4, title: 'Produto 4', price: 150, category: 'men', imageUrl: 'https://colorlib.com/preview/theme/fashi/img/products/man-2.jpg' },
            { id: 5, title: 'Produto 5', price: 10, category: 'men', imageUrl: 'https://colorlib.com/preview/theme/fashi/img/products/man-4.jpg' },
            { id: 6, title: 'Produto 6', price: 19.99, category: 'men', imageUrl: 'https://colorlib.com/preview/theme/fashi/img/products/man-1.jpg' }
        ];

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate - public
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: `fake-jwt-token`
                });
            }

            // get all users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                if (!isLoggedIn) return unauthorised();
                return ok(users);
            }

            // get all products
            if (request.url.endsWith('/products') && request.method === 'GET') {
                return ok(products);
            }

            // get all categories
            if (request.url.endsWith('/categories') && request.method === 'GET') {
                return ok(categories);
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

        // private helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};