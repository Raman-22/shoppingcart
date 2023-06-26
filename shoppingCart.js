const cartButton = document.querySelector("[data-cart-button]");
const cartItemWrapper = document.querySelector("[data-cart-item-wrapper]");
const shoppingCart = [];
export function setupShoppingCart() {}

cartButton.addEventListener("click", () => {
  cartItemWrapper.classList.toggle("invisible");
});

export function addToCart(id) {
  shoppingCart.push({ id: id, quantity: 1 });
  console.log(shoppingCart);
}
