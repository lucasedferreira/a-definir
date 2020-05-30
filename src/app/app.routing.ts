﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './public/home/home.component';
import { LoginComponent, EmailSentComponent } from './login';
import { AuthGuard } from './_guards';
import { ProductsComponent } from './public/products/products.component';
import { MyAccountComponent } from './public/my-account/my-account.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'email-sent',
        component: EmailSentComponent
    },
    {
        path: 'my-account',
        component: MyAccountComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'products',
        component: ProductsComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];