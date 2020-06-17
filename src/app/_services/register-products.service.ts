import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RegisterProductsService {
  

  constructor(private http: HttpClient) {}

  addProductService(product: any){
    return this.http.post<any>(`${environment.apiUrl}/product`, product)
    .pipe(map(product => {
        
        if (Object.keys(product).length !== 0) {
            
            console.log("O produto chegou no serviço com sucesso" + product)
        }

        return product;
    }));
  }


}
