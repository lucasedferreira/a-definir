import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CategoryService } from '../../../_services/category.service';

import * as b from  './test.json';

@Component({
  selector: 'app-category-existing',
  templateUrl: './category-existing.component.html',
  styleUrls: ['./category-existing.component.css']
})
export class CategoryExistingComponent implements OnInit {
  @Output() categoryExisting: EventEmitter<any> = new EventEmitter<any>();

  teste1 = b.categoria
  allCategory: any;

  constructor(categoryService: CategoryService) { 
    this.allCategory = categoryService.getAll();
  }

  ngOnInit(): void { }


  infoCategoryExisting(event) {
    this.categoryExisting.emit(event.target.value);
    console.log(event.target.value)
  }

}
