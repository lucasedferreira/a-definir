﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

import { trigger, state, style, animate, transition } from '@angular/animations'
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [
        trigger('toggleLoginRegister', [
            state('login', style({
                right: 'calc(50% - 50px)'
            })),
            state('register', style({
                right: '50px',
                height: '550px'
            })),
            transition('* => *', [
                animate('250ms 0s ease-in-out')
            ])
        ])
    ]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    registerForm: FormGroup;
    loading = false;
    loginSubmitted = false;
    registerSubmitted = false;
    returnUrl: string;
    error = '';
    pageStatus: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private socialAuthService: AuthService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required, Validators.minLength(5)],
            confirmPass: ['', Validators.required]
        }, {validator: this.confirmedValidator('password', 'confirmPass') });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        let type = this.route.snapshot.paramMap.get('type');
        this.pageStatus = type ? type.toLowerCase() : 'login';
    }

    toggleLoginRegister() {
        this.pageStatus = this.pageStatus == 'login' ? 'register' : 'login';
    }

    // convenience getter for easy access to form fields
    get formLogin() { return this.loginForm.controls; }
    get formRegister() { return this.registerForm.controls; }

    login() {
        this.loginSubmitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login({ email: this.formLogin.email.value, password: this.formLogin.password.value })
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

    confirmedValidator(controlName: string, matchingControlName: string){
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    register() {
        this.registerSubmitted = true;

        if (this.registerForm.invalid) return;

        this.loading = true;
        this.authenticationService.register({ name: this.formRegister.name.value, email: this.formRegister.email.value, password: this.formRegister.password.value })
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/email-sent']);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

    signInWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialUser => {
            this.loading = true;
            this.authenticationService.login(socialUser)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.error = error;
                        this.loading = false;
                    });
        });
    }

    signInWithFacebook(): void {
        this.error = 'In progress...';
    }
}
