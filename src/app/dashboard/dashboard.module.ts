import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardRoutes } from './dashboard.routing';
import { AuthGuard } from '../_guards';
import { DasboardHomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";

import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsComponent } from './products/products.component';
import { ProductModelComponent } from './products/product-model/product-model.component';
import { ReactiveFormsModule } from '@angular/forms';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(dashboardRoutes),
    CurrencyMaskModule
  ],
  declarations: [
    DashboardComponent,
    DasboardHomeComponent,
    NavbarComponent,
    SidebarComponent,
    ProductsComponent,
    ProductModelComponent
  ],
  providers: [
    AuthGuard,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
