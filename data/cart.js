export let cart = JSON.parse(localStorage.getItem("savedCartItems")) || [];

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
      deliveryOptionId: "1",
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

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  updateCartQuantityDisplay(cartQuantity);
}

function updateCartQuantityDisplay(cartQuantity) {
  const cartQuantityElement = document.querySelector(".js-cart-quantity");
  const returnToHomeLinkElement = document.querySelector(
    ".js-return-to-home-link"
  );

  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  } else {
    console.error(".js-cart-quantity element not found");
  }

  if (returnToHomeLinkElement) {
    returnToHomeLinkElement.innerHTML = `${cartQuantity} items`;
  } else {
    console.error(".js-return-to-home-link element not found");
  }
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  savingToStorage();
}
