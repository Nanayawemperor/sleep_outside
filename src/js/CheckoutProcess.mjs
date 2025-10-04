import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// Converts form data into a JSON object
function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

// Simplify cart items to the required structure
function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    price: item.FinalPrice,
    name: item.Name,
    quantity: 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #numberItems"
    );

    itemNumElement.innerText = this.list.length;

    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    // tax = 6% of subtotal
    this.tax = this.itemTotal * 0.06;
    // shipping = $10 + $2 for each additional item
    this.shipping = 10 + (this.list.length - 1) * 2;
    // total = subtotal + tax + shipping
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  /**
   * Called when the checkout form is submitted.
   * Collects all form data, adds order details (totals, date, items),
   * and sends the order to ExternalServices.
   */
  async checkout(form) {
    // 1️⃣ Convert form data into a JSON object
    const order = formDataToJSON(form);

    // 2️⃣ Add computed order details
    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    // 3️⃣ Send the order data to the ExternalServices API
    try {
      const response = await services.checkout(order);
      console.log("Order successfully sent:", response);

      // Optional: Clear cart or show confirmation
      localStorage.removeItem(this.key);
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  }
}