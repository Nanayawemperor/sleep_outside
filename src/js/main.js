// Import the ProductData module
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Create an instance of ProductData with "tents" as the category
const dataSource = new ProductData("tents");

const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);

productList.init();