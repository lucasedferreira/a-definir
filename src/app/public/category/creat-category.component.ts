import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CategoryService } from 'src/app/_services/category.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-creat-category',
  templateUrl: './creat-category.component.html',
  styleUrls: ['./creat-category.component.css']
})
export class CreatCategoryComponent implements OnInit {
  infoCategory: FormGroup;
  loading = false;
  error: string;
  success: string;
  categoryReceiver = '';

  constructor(
    private formBuilder: FormBuilder,
    private registerCategoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.infoCategory = this.formBuilder.group({
      nameCategory: [null, Validators.required],
      subCategory: [false],
    });
  }

  receiveCategoryExisting(category){
    this.categoryReceiver = category 
    return this.categoryReceiver;
  }

  onResetForm() {
    this.infoCategory.reset();
  }

  creatCategory(){

    if(this.infoCategory.valid) {
      
      this.loading = true;
      this.registerCategoryService.addNewCategory( { nameCategory: this.c.nameCategory.value, subCategory: this.c.subCategory.value, selectCategoryExisting: this.categoryReceiver } )
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            this.loading = false;
            this.success = "Categoria criada com sucesso.";
            this.onResetForm();
          },
          error => {
            console.log(error)
            this.loading = false;
            this.error = "Não foi possível cadastrar uma nova categoria.";
          }
          
        )
    }
  }

  get c() { 
    return this.infoCategory.controls; 
  }

}
