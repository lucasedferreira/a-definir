import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService, ProductCategoryService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { ProductCategory } from 'src/app/_models';

@Component({
	selector: 'app-product-model',
	templateUrl: './product-model.component.html',
	styleUrls: ['./product-model.component.css']
})
export class ProductModelComponent implements OnInit {
	@Input() product: any;
	productForm: FormGroup;
	price: number;
	images = [{name: '', file: ''}];

	loading:boolean = false;
	registerSubmitted:boolean = false;

	categories: ProductCategory[];

	constructor(private formBuilder: FormBuilder,
				private productService: ProductService,
				private categoryService: ProductCategoryService) { }

	ngOnInit(): void {
		this.productForm = this.formBuilder.group({
			name: ['', Validators.required],
			price: ['', Validators.required],
			description: [''],
			available: [''],
			categoryID: ['', Validators.required],
			images: ['']
		});

		this.categoryService.getAll().subscribe(categories => this.categories = categories);
	}

	get form() { return this.productForm.controls; }

	onFileChange(event, index:number) {
		const reader = new FileReader();

		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.images[index].name = file.name;
				this.images[index].file = reader.result as string;
				this.productForm.patchValue({
					images: this.images.map(image => image.file)
				});
			};
		}
	}

	addImage() {
		this.images.push({name: '', file: ''});
	}

	submit() {
		this.registerSubmitted = true;

		if (this.productForm.invalid) return;

		this.loading = true;
		console.log('this.productForm', this.productForm.value);
		// this.productService.create(this.productForm.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
		// 			// this.router.navigate(['/email-sent']);
		// 			console.log('ae poha');
        //         },
        //         error => {
        //             this.loading = false;
        //         });
	}
}
