const cartItems = localStorage.getItem("savedCartItems");
const cartArray = JSON.parse(cartItems);
export let cart = cartArray || [];
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
  savingToStorage();
}

export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  savingToStorage();
  console.log(cart);
}

function savingToStorage() {
  localStorage.setItem("savedCartItems", JSON.stringify(cart));
}
