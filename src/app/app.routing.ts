import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { ProductsComponent } from './public/products/products.component';
import { MyAccountComponent } from './public/my-account/my-account.component';
import { RegisterProductsComponent } from './public/register-products/register-products.component';

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
        path: 'my-account',
        component: MyAccountComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'register-products',
        component: RegisterProductsComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];