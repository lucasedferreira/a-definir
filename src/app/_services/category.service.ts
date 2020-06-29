import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { Category } from '../_models';

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
    }

    addNewCategory(category: any){
        
        if (Object.keys(category).length !== 0) {
            return this.http.post<any>(`${environment.apiUrl}/category`, category)
            .pipe(map(category => {
                console.log("O produto chegou no serviço com sucesso" + category)
            }));
                
        }
        return category;
    }
}