export let cart = [
  {
    productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    quantity: 2,
  },
  {
    productId: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    quantity: 1,
  },
  {
    productId: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    quantity: 7,
  },
];
let savedCartItems;

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  savedCartItems = cart;

  console.log(savedCartItems);
}

export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  console.log(cart);
}

export function savingToStorage() {
  let myCartString = JSON.stringify(savedCartItems);
  localStorage.setItem("savedCartItems", myCartString);
}
