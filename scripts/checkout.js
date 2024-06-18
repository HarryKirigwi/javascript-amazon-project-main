import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import "../data/cart-class.js";
//import "../data/backed-practice.js";
import { loadProducts } from "../data/products.js";

new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});


//LOading two promises
/*
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve();
    });
  }),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
 
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});



// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve();
//   });
// })
//   .then(() => {
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });

// loadProducts(() => {
//   renderOrderSummary();
// renderPaymentSummary();
// });
