import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductCategory } from '../_models/product-category.model';

@Injectable()
export class ProductCategoryService {

	constructor(private http: HttpClient) { }

	getAll() {
		return this.http.get<ProductCategory[]>(`${environment.apiUrl}/product-category`);
	}

	create(category) {
		return this.http.post<ProductCategory>(`${environment.apiUrl}/product-category`, category);
	}

	delete(categoryID: number) {
        return this.http.delete<any>(`${environment.apiUrl}/product-category/${categoryID}`);
    }
}