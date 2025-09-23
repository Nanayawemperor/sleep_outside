import { loadTemplate, renderWithTemplate } from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key; // key for localStorage
    this.listElement = listElement; // DOM element to render cart into
    this.items = getLocalStorage(this.key) || [];
  }

  // Render the cart
  async renderCart() {
    const template = await loadTemplate("cart-item-template");

    // clear before rendering
    this.listElement.innerHTML = "";

    const footer = document.querySelector(".list-footer");
    const totalElement = document.querySelector(".list-total");

    if (this.items.length === 0) {
      this.listElement.innerHTML = `<p>Your cart is empty.</p>`;
      if(footer) footer.classList.add("hide");
      return;
    }

    renderWithTemplate(
      (item) => this.prepareTemplate(template, item),
      this.listElement,
      this.items,
      "beforeend",
      true
    );
     // Show total
    if (footer) {
        footer.classList.remove("hide");
        if (totalElement) {
          totalElement.textContent = `$${this.getTotal().toFixed(2)}`;
    }
    }
  }

  // Fill in template with item details
  prepareTemplate(template, item) {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".cart-item-name").textContent = item.name;
    clone.querySelector(".cart-item-qty").textContent = item.quantity;
    clone.querySelector(".cart-item-price").textContent = `$${item.price}`;
    return clone;
  }

  // Add item to cart
  addItem(product) {
    const existing = this.items.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    setLocalStorage(this.key, this.items);
    this.renderCart();
  }

  // Remove item from cart
  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    setLocalStorage(this.key, this.items);
    this.renderCart();
  }

  // Get total
  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}