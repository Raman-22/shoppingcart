import items from "./items.json";
import formateCurrency from "./utils/formateCurrency";
import addGlobleEventListner from "./utils/addGlobleEventListner";

const cartButton = document.querySelector("[data-cart-button]");
const cartItemWrapper = document.querySelector("[data-cart-item-wrapper]");
let shoppingCart = loadCart();
const IMAGE_URL = "https://dummyimage.com/210x130";
const cartIteamTemplate = document.querySelector("#cart-item-template");
const cartItemContainer = document.querySelector("[data-cart-item-container]");
const cartQuantity = document.querySelector("[data-cart-quantity]");
const cartTotal = document.querySelector("[data-cart-total]");
const cart = document.querySelector("[data-cart]");
const SESSION_STORAGE_KEY = `SHOPPING_CART-cart`;

export function setupShoppingCart() {
  addGlobleEventListner("click", "[data-remove-from-cart-button]", (e) => {
    const id = parseInt(e.target.closest("[data-item]").dataset.itemId);
    removeFromCart(id);
  });
  cartButton.addEventListener("click", () => {
    cartItemWrapper.classList.toggle("invisible");
  });
  shoppingCart = loadCart();
  renderCart();
}

export function addToCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    shoppingCart.push({ id: id, quantity: 1 });
  }
  saveCart();
  renderCart();
}

function saveCart() {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart));
}

function loadCart() {
  const cart = sessionStorage.getItem(SESSION_STORAGE_KEY);
  return JSON.parse(cart) || [];
}

function removeFromCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  if (existingItem == null) return;
  shoppingCart = shoppingCart.filter((entry) => entry.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  if (shoppingCart.length === 0) {
    hideCart();
  } else {
    showCart();
    renderCartItem();
  }
}

function hideCart() {
  cart.classList.add("invisible");
}
function showCart() {
  cart.classList.remove("invisible");
}

function renderCartItem() {
  cartItemContainer.innerHTML = "";
  cartQuantity.innerText = shoppingCart.length;

  const totalCents = shoppingCart.reduce((sum, entry) => {
    const item = items.find((i) => entry.id === i.id);
    return sum + item.priceCents * entry.quantity;
  }, 0);

  cartTotal.innerHTML = formateCurrency(totalCents / 100);

  shoppingCart.forEach((entry) => {
    const item = items.find((i) => entry.id === i.id);
    const cartItem = cartIteamTemplate.content.cloneNode(true);

    const container = cartItem.querySelector("[data-item]");
    container.dataset.itemId = item.id;

    const name = cartItem.querySelector("[data-name]");
    name.innerText = item.name;

    const price = cartItem.querySelector("[data-price]");
    price.innerText = formateCurrency((item.priceCents * entry.quantity) / 100);

    if (entry.quantity > 1) {
      const quantity = cartItem.querySelector("[data-quantity]");
      quantity.innerText = `x${entry.quantity}`;
    }
    const image = cartItem.querySelector("[data-image]");
    image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`;

    cartItemContainer.appendChild(cartItem);
  });
}
