import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../_models';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Product[]>(`${environment.apiUrl}/product`);
    }

    create(product: any) {
        return this.http.post<any>(`${environment.apiUrl}/product`, product)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }

    getByID(productID) {
        console.log('productID', productID);
        return this.http.get<Product>(`${environment.apiUrl}/product/${productID}`);
    }

    delete(productID: number) {
        return this.http.delete<any>(`${environment.apiUrl}/product/${productID}`);
    }
}