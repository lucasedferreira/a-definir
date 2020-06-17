import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DasboardHomeComponent } from './home/home.component';
import { RegisterProductsComponent } from '../public/register-products/register-products.component';
import { AuthGuard, RoleGuard } from '../_guards';


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
            
            { path: '**', redirectTo: 'dashboard' }
        ],
    }
];