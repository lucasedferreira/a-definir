import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { DashboardModule } from './dashboard/dashboard.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './login';;
import { ProductsComponent } from './public/products/products.component'
import { ProductService, ShoppingCartService, CategoryService } from './_services';;
import { ProductCartComponent } from './public/products/product-cart/product-cart.component';
import { FilterComponent } from './public/products/filter/filter.component';
import { MyAccountComponent } from './public/my-account/my-account.component';
import { HeaderComponent } from './public/header/header.component';
import { FooterComponent } from './public/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LaddaModule } from 'angular2-ladda';

import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { RouterModule } from '@angular/router';;
import { EmailSentComponent } from './login/email-sent/email-sent.component'

const config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('279414834705-tcgk7k3c81q40rmtv961gq6smffadloi.apps.googleusercontent.com')
    }
]);
export function provideConfig() {
    return config;
}

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FontAwesomeModule,
        BrowserAnimationsModule,
        SocialLoginModule,
        LaddaModule.forRoot({
            style: "slide-left",
            spinnerColor: "#E66866"
        }),
        DashboardModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        ProductsComponent,
        ProductCartComponent,
        FilterComponent,
        MyAccountComponent,
        HeaderComponent,
        FooterComponent
,
        EmailSentComponent    ],
    providers: [
        // provider used to create fake backend
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: AuthServiceConfig, useFactory: provideConfig },

        fakeBackendProvider,
        ProductService,
        ShoppingCartService,
        CategoryService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }