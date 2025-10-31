class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === product.id) {
        cartItem.quantity = item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;

        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }

    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }
}

module.exports = Cart;

/*
    If the product ID matches, we've found the item to update
    if (item.product.id === product.id) {
        -- PRODUCT ALREADY EXISTS ---
        --- Directly increase the quantity and total price of the existing item
        item.quantity++;
        item.totalProductPrice += product.price;

        --- Update the cart's overall totals
        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
    }
*/
