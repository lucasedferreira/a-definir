import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DasboardHomeComponent } from './home/home.component';
import { AuthGuard, RoleGuard } from '../_guards';
import { ProductsComponent } from './products/products.component';

export const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DasboardHomeComponent,
                data: {role: 'admin'},
                canActivate: [RoleGuard]
            },
            {
                path: 'products',
                component: ProductsComponent,
                data: {role: 'admin'},
                canActivate: [RoleGuard]
            },
            { path: '**', redirectTo: 'dashboard' }
        ],
    }
];