import { cart } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { gettingProduct } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { calculateCartQuantity } from "../../data/cart.js";

export function renderPaymentSummary() {
  let cartQuantity = calculateCartQuantity();

  let aggregatePrice = 0;
  let priceInDollars = 0;
  let shippingCost = 0;
  let tax = 0;
  let priceAfterTax = 0;
  let totalBeforeTax = 0;

  cart.forEach((item) => {
    const matchingProduct = gettingProduct(item.productId);
    aggregatePrice += item.quantity * matchingProduct.priceCents;
    priceInDollars = formatCurrency(aggregatePrice);

    deliveryOptions.forEach((option) => {
      if (item.deliveryOptionId === option.id) {
        shippingCost += option.priceCents;
      }
    });
  });
  totalBeforeTax = aggregatePrice + shippingCost;
  tax = totalBeforeTax * 0.1;
  priceAfterTax = totalBeforeTax + tax;

  let mainHTML = `
    <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${cartQuantity}):</div>
          <div class="payment-summary-money">$${formatCurrency(
            aggregatePrice
          )}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(
            shippingCost
          )}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(
            totalBeforeTax
          )}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(
            priceAfterTax
          )}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>`;

  document.querySelector(".js-payment-summary").innerHTML = mainHTML;
}
