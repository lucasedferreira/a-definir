import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DasboardHomeComponent } from './home/home.component';
import { AuthGuard, RoleGuard } from '../_guards';

export const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                component: DasboardHomeComponent,
                data: {role: 'admin'},
                canActivate: [RoleGuard]
            }
        ]
    }
];