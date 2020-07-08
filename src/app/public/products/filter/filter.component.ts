import { Component, OnInit, Input } from '@angular/core';
import { ProductCategoryService } from 'src/app/_services';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  categories$;
  @Input('categoryID') categoryID;

  constructor(categoryService: ProductCategoryService) {
    this.categories$ = categoryService.getAll();
  }

  ngOnInit(): void {
  }
}
