import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models';
import { ProductService } from 'src/app/_services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => this.products = products);
  }

}
