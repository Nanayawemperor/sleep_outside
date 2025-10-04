import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countEl = document.getElementById("card-count");

    if (countEl) {
        if (cart.length>0) {
        countEl.textContent = cart.length;
        countEl.style.display = "inline-block";
        } else {
        countEl.style.display = "none";
    }
}
}

document.addEventListener("DOMContentLoaded", updateCartCount);
