const getData = () => products

const productElements = createProductElements(getData())

const main = document.querySelector('main > div.products')
productElements.forEach(product => main.appendChild(product))


/* SHOPPING CART MENU */
const cartMenu = document.querySelector('#shopping-menu')
const cartTotal = cartMenu.querySelector('.total')
let total = 0;

emptyCartProductsBehavior(cartMenu, cartTotal)
buyCartProductsBehavior(cartMenu, cartTotal)