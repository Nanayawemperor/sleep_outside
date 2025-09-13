import { getParam, addProductToCart } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

//Add to cart button event handler
async function addToCartHandler(event) {
  const selectedProduct = await dataSource.findProductById(event.target.dataset.id);
  addProductToCart(selectedProduct);
}
//Add listener to Add to cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
