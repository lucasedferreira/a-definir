import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { ProductsComponent } from './products/products.component';
import { MyAccountComponent } from './my-account/my-account.component';

const appRoutes: Routes = [
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

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);