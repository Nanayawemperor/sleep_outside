import { getLocalStorage } from "./utils.mjs";

function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const countElement = document.querySelector("#cart-count");
  if (countElement) {
    countElement.textContent = cart.length;
    //hide if empty
    countElement.computedStyleMap.display =
      cart.length > 0 ? "inline-block" : "none";
  }
}

updateCartCount();
