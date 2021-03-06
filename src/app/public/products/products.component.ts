import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product, ShoppingCart } from '../../_models';
import { ProductService, ShoppingCartService } from '../../_services';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categoryID: Number;
  cart: Observable<ShoppingCart>;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    // this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        console.log('products', this.products);
        return this.route.queryParamMap;
      }))
    .subscribe(params => {
      this.categoryID = parseInt(params.get('category'));
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.categoryID) ?
    this.products.filter(p => p.categoryID === this.categoryID) :
    this.products;
  }

}
