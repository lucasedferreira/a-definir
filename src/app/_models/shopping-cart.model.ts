import { ShoppingCartItem } from './shopping-cart-item.model';
import { Product } from './product.model';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(private itemsMap: { [productId: string]: ShoppingCartItem}) {
    this.itemsMap = itemsMap || {};
    // tslint:disable-next-line:forin
    for (const productId in itemsMap) {
      const item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({...item, id: productId}));
    }
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.id];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    // tslint:disable-next-line:forin
    for (let productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    // tslint:disable-next-line:curly
    for (const productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;
    return count;
  }
}
