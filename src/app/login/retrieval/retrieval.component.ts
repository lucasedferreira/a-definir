import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-retrieval',
	templateUrl: './retrieval.component.html',
	styleUrls: ['../login.component.css']
})
export class RetrievalComponent implements OnInit {
	token: String;
	newPassForm: FormGroup;

	submitted = false;
	loading = false;
	error = '';

	constructor(private route: ActivatedRoute,
				private formBuilder: FormBuilder, 
				private router: Router,
				private authenticationService: AuthenticationService) { }

	ngOnInit(): void {
		this.token = this.route.snapshot.paramMap.get("token");

		this.newPassForm = this.formBuilder.group({
			password: ['', Validators.required, , Validators.minLength(5)],
			confirmPass: ['', Validators.required]
		}, { validator: this.confirmedValidator('password', 'confirmPass') });
	}

	// convenience getter for easy access to form fields
    get f() { return this.newPassForm.controls; }

	confirmedValidator(controlName: string, matchingControlName: string) {
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

	newPass() {
        this.submitted = true;

        if (this.f.invalid) return;

        this.loading = true;
        this.authenticationService.recoverPassword({ token: this.token, password: this.f.password.value, newPasswordConfirm: this.f.confirmPass.value })
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

}
