import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateDeliveryOption,
  savingToStorage,
} from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { gettingProduct } from "../../data/products.js";
import { renderPaymentSummary } from "./paymentSummary.js";

function updateCartQuantity() {
  let cartQuantity = calculateCartQuantity();
  document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${cartQuantity} items`;
}
updateCartQuantity();

export function renderOrderSummary() {
  let checkoutItemHTML = "";

  cart.forEach((cartItem) => {
    const matchingProduct = gettingProduct(cartItem.productId);

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (cartItem.deliveryOptionId === option.id) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDay, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    checkoutItemHTML += `
<div class="cart-item-container
js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${
                      matchingProduct.id
                    }" id = "itemQuantity${matchingProduct.id}">${
      cartItem.quantity
    }</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-link-${
                    matchingProduct.id
                  }" data-product-id = "${matchingProduct.id}">
                    Update
                  </span>
                  <div class="is-editing-quantity is-editing-quantity-${
                    matchingProduct.id
                  }">
                  <input class="quantity-input js-quantity-input" id = "quantityInput${
                    matchingProduct.id
                  }" data-product-id = "${matchingProduct.id}">
                  <span class="save-quantity-link 
                  link-primary js-save-quantity-link" 
                  data-product-id = "${matchingProduct.id}">Save</span></div>
                  
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
  `;

    function deliveryOptionsHTML(matchingProduct, cartItem) {
      let html = "";
      deliveryOptions.forEach((option) => {
        const today = dayjs();
        const deliveryDate = today.add(option.deliveryDay, "days");
        const dateString = deliveryDate.format("dddd, MMMM D");

        const isChecked = cartItem.deliveryOptionId === option.id;

        const priceString =
          option.priceCents === 0
            ? "FREE"
            : `$${formatCurrency(option.priceCents)}`;

        html += `<div class="delivery-option js-delivery-option" data-product-id = "${
          matchingProduct.id
        }" data-delivery-option-id = "${option.id}">
        <input type="radio" ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
    </div>
    </div>
                </div>`;
      });
      return html;
    }

    document.querySelector(".js-order-summary").innerHTML = checkoutItemHTML;

    document.querySelectorAll(".js-delete-link").forEach((button) => {
      let productId = button.dataset.productId;
      button.addEventListener("click", () => {
        removeFromCart(productId);
        updateCartQuantity();
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();
        renderPaymentSummary();
      });
    });

    document.querySelectorAll(".js-delivery-option").forEach((element) => {
      element.addEventListener("click", () => {
        const { deliveryOptionId, productId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

    document.querySelectorAll(".js-update-quantity-link").forEach((button) => {
      const productId = button.dataset.productId;

      button.addEventListener("click", () => {
        if (productId === productId) {
          const inputElements = document.querySelector(
            `.is-editing-quantity-${productId}`
          );
          inputElements.classList.add("quantity-update");
          document
            .querySelector(`.js-update-quantity-link-${productId}`)
            .classList.add("update-disappear");
          const quantityElement = document.querySelector(
            `.js-quantity-label-${productId}`
          );
          quantityElement.classList.add("update-disappear");
          const input = document.getElementById(`quantityInput${productId}`);
          let quantity = document.getElementById(
            `itemQuantity${productId}`
          ).innerHTML;
          input.value = quantity;
        }
      });

      document.querySelectorAll(".js-quantity-input").forEach((element) => {
        const productId = element.dataset.productId;
        element.addEventListener("keypress", handleKeyPress);

        function handleKeyPress(event) {
          if (event.key === "Enter") {
            checkoutPageUpdate(productId);
          }
        }
      });

      function checkoutPageUpdate(productId) {
        if (productId === productId) {
          document
            .querySelector(`.is-editing-quantity-${productId}`)
            .classList.remove("quantity-update");

          document
            .querySelector(`.js-update-quantity-link-${productId}`)
            .classList.remove("update-disappear");
          document
            .querySelector(`.js-quantity-label-${productId}`)
            .classList.remove("update-disappear");
         
          const input = document.getElementById(`quantityInput${productId}`);

          const product = gettingProduct(productId);
          product.quantity = input.value;
          savingToStorage();
          renderPaymentSummary();

          let quantity = (document.getElementById(
            `itemQuantity${productId}`
          ).innerHTML = input.value);

          function updateQuantity(productId) {
            cart.forEach((cartItem) => {
              if (cartItem.productId === productId) {
                cartItem.quantity = Number(quantity);
              }
            });
          }
          updateQuantity(productId);
          updateCartQuantity();
        }
      }

      document.querySelectorAll(".js-save-quantity-link").forEach((button) => {
        const productId = button.dataset.productId;
        button.addEventListener("click", () => {
          checkoutPageUpdate(productId);
        });
      });
    });
  });
}
