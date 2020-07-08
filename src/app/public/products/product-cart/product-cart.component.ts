import { Component, OnInit, Input } from '@angular/core';
import { Product, ShoppingCart } from 'src/app/_models';
import { ShoppingCartService } from 'src/app/_services';
import { faSearch, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faHeart = faHeart;
  imageUrl = environment.imageUrl + '/products/';

  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') showActions = true;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    // return this.cartService.addToCart(this.product);
  }
}
