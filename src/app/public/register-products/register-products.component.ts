import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { RegisterProductsService } from 'src/app/_services/register-products.service';


@Component({
  selector: 'app-register-products',
  templateUrl: './register-products.component.html',
  styleUrls: ['./register-products.component.css']
})
export class RegisterProductsComponent implements OnInit {
  registerProducts: FormGroup;
  loading = false;
  error: string;
  success: string;
  categoryReceiver = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private registerProductService: RegisterProductsService,
      
  ) { }

  ngOnInit(): void {
    this.registerProducts = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null],
      sex: [null, Validators.required],
      valueItem: [null, Validators.required],
      fileImage: [null, Validators.required],  
    });

  }


  uploadFile(e) {
    const selectedFiles = <FileList>e.srcElement.files;
    const fileName = [];
    this.registerProducts.value.fileImage = fileName;

    for(let i = 0; i < selectedFiles.length; i++){
      fileName.push(selectedFiles[i].name);
    }
    document.getElementById('customFileLabel').innerHTML = fileName.join(', ');
  }

  receiveCategoryExisting(category) {
    this.categoryReceiver = category;
    return this.categoryReceiver;
  }

  onResetForm() {
    this.registerProducts.reset();
  }

  registerNewProduct() {
    
    if(this.registerProducts.valid) {
      
      this.loading = true;
      this.registerProductService.addNewProduct( { title: this.r.title.value, description: this.r.description.value, sex: this.r.sex.value, 
        valueItem: this.r.valueItem.value, selectCategoryExisting: this.categoryReceiver, fileImage: this.r.fileImage.value } )
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            this.loading = false;
            this.success = "Produto cadastrado com sucesso.";
            this.onResetForm();
          },
          error => {
            console.log(error)
            this.loading = false;
            this.error = "Não foi possível cadastrar um novo produto.";
          }
          
        )
    }
    
  }

  get r() { 
    return this.registerProducts.controls; 
  }
  
}