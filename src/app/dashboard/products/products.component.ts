import { Component, OnInit } from '@angular/core';
import { Product, ProductCategory } from 'src/app/_models';
import { ProductService, ProductCategoryService } from 'src/app/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
	products: Product[];
	categories: ProductCategory[];
	categoryName: String;
	selectedProduct: any;

	creatingCategory:Boolean = false;
	categoryForm: FormGroup;

	constructor(private formBuilder: FormBuilder,
				private productService: ProductService,
				private productCategoryService: ProductCategoryService) { }

	ngOnInit(): void {
		this.productCategoryService.getAll().subscribe(categories => this.categories = categories);
		this.productService.getAll().subscribe(products => this.products = products);

		this.categoryForm = this.formBuilder.group({
			name: ['', Validators.required]
		});
	}

	delete(productID, index): void {
		this.productService.delete(productID).subscribe(() => {
			this.products.splice(index, 1);
		});
	}

	addCategory(): void {
		this.productCategoryService.create(this.categoryForm.value).subscribe((category) => {
			this.categories.unshift(category);
			this.creatingCategory = false;
			this.categoryForm = this.formBuilder.group({
				name: ['', Validators.required]
			});
		});
	}

	deleteCategory(categoryID, index): void {
		console.log(categoryID, index);
		this.productCategoryService.delete(categoryID).subscribe(() => {
			this.categories.splice(index, 1);
		});
	}

}
