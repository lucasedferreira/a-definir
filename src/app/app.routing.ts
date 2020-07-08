import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './public/home/home.component';
import { LoginComponent, RetrievalComponent } from './login';
import { AuthGuard } from './_guards';
import { ProductsComponent } from './public/products/products.component';
import { MyAccountComponent } from './public/my-account/my-account.component';
import { ProductDetailComponent } from './public/products/product-detail/product-detail.component';

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
        path: 'retrieval/:token',
        component: RetrievalComponent
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
        path: 'product/:id',
        component: ProductDetailComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];