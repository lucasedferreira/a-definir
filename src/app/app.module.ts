import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login';;
import { ProductsComponent } from './products/products.component'
import { ProductService, ShoppingCartService, CategoryService } from './_services';;
import { ProductCartComponent } from './products/product-cart/product-cart.component';
import { FilterComponent } from './products/filter/filter.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';;
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
,
        FontAwesomeModule    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        ProductsComponent,
        ProductCartComponent ,
        FilterComponent ,
        MyAccountComponent ,
        HeaderComponent ,
        FooterComponent],
    providers: [
        // provider used to create fake backend
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        fakeBackendProvider,
        ProductService,
        ShoppingCartService,
        CategoryService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }