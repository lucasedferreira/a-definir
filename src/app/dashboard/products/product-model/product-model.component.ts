import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService, ProductCategoryService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { ProductCategory, Product } from 'src/app/_models';

@Component({
	selector: 'app-product-model',
	templateUrl: './product-model.component.html',
	styleUrls: ['./product-model.component.css']
})
export class ProductModelComponent implements OnInit {
	@Input() product: Product;
	@Input() productList: Product[];
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
		console.log('a', this.productList);
		this.productForm = this.formBuilder.group({
			name: ['', Validators.required],
			price: ['', Validators.required],
			description: [''],
			available: [1],
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
		console.log('submit');
		this.registerSubmitted = true;

		if (this.productForm.invalid) return;

		this.loading = true;
		this.productService.create(this.productForm.value)
            .pipe(first())
            .subscribe(
                data => {
					this.productList.push(data);
                },
                error => {
                    this.loading = false;
                });
	}
}
