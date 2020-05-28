import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardRoutes } from './dashboard.routing';
import { AuthGuard } from '../_guards';
import { DasboardHomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  declarations: [
    DashboardComponent,
    DasboardHomeComponent
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }