import { calculateCartQuantity } from "../../data/cart.js";



export function renderCheckoutHeader() {
  let cartQuantity = calculateCartQuantity();
  const checkoutHeaderHTML = `
  <div> Checkout (<a class="return-to-home-link" href="amazon.html">
  ${cartQuantity} items
  </a>)
  </div>
  `;
  document.querySelector(".js-checkout-header-middle-section").innerHTML = checkoutHeaderHTML;
}