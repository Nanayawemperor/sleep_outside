import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Load shared header/footer
loadHeaderFooter();

// Create checkout process instance
const checkout = new CheckoutProcess("so-cart", ".checkout-summary");

// Initialize checkout process
checkout.init();
checkout.calculateOrderTotal();

// 🧩 Optional: If ZIP code changes, recalc totals
document
  .querySelector("#zip")
  .addEventListener("blur", checkout.calculateOrderTotal.bind(checkout));

// 🧾 Handle checkout form submit
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  checkout.checkout(e.target);
});
