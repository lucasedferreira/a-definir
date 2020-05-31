import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  selectedProduct: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
