import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // ✅ Always an array
  const productList = document.querySelector(".product-list");
  const footer = document.querySelector(".list-footer");

  // ✅ Handle empty cart
  if (cartItems.length === 0) {
    productList.innerHTML = `
      <li class="empty-cart">
        <p>Your cart is empty.</p>
        <a href="/product-listing.html" class="button">Start Shopping</a>
      </li>
    `;
    footer.classList.add("hide"); // hide footer when cart empty
    return;
  }

  // ✅ Render items if not empty
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // ✅ Show total
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  document.querySelector(".list-total").textContent = `$${total.toFixed(2)}`;
  footer.classList.remove("hide");
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="product.html?id=${item.Id}" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}">
      </a>
      <a href="product.html?id=${item.Id}">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors?.[0]?.ColorName ?? "—"}</p>
      <p class="cart-card__quantity">Qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

renderCartContents();