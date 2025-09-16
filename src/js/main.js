import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getLocalStorage } from "./utils.mjs";
const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

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
productList.init();