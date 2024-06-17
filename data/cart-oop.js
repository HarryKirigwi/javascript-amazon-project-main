function Cart(localStorageKey) {
  const cart = {
    cartItems: JSON.parse(localStorage.getItem(localStorageKey)) || [],

    savedCartItems: undefined,

    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }
      this.savedCartItems = this.cartItems;
      this.savingToStorage();
    },

    removeFromCart(productId) {
      let newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.savingToStorage();
    },

    savingToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    calculateCartQuantity() {
      let cartQuantity = 0;

      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      return cartQuantity;
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;
      this.savingToStorage();
    },
  };

  return cart;
}

const cart = Cart("savedCartItems-oop");
const businessCart = Cart("businessCart-oop");

console.log(cart);
console.log(businessCart);
