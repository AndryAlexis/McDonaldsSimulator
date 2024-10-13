import { products as data } from './data.js'  // Import product data
import Product from './product.js'            // Import the Product class
import ShoopingCartMenu from './shoppingMenu.js'  // Import the ShoppingCartMenu class

// Currency type used for product prices
const TYPE_OF_CURRENCY = '€'

// Create an instance of the Product class, configuring its properties
const product = new Product(
    {
        rootPathFolder: './img/',  // Path to the folder where product images are stored
        loadType: 'lazy',          // Image loading type (lazy loading)
        width: 255,                // Image width
        height: 255                // Image height
    },
    'Agregar al carrito',         // Button text for adding to the cart
    'Precio: ',                   // Prefix text for the price
    'Stock: ',                    // Prefix text for the stock amount
    TYPE_OF_CURRENCY              // Currency type (Euro)
)

// Create an instance of the ShoppingCartMenu class
const shoopingCartMenu = new ShoopingCartMenu(
    'Total: ',                                       // Text displayed before the total price
    TYPE_OF_CURRENCY,                                // Currency type (Euro)
    'Eliminar',                                      // Delete button text
    '+',                                             // Plus button text for increasing quantity
    '-',                                             // Minus button text for decreasing quantity
    'Compra realizada con éxito. ¡Gracias por tu compra!',  // Success message for purchase
    'Su carro está vacío'                            // Message displayed when the cart is empty
)

const main = document.querySelector('main > div.products')  // Select the main element to display products

/**
 * Creates and appends all product elements into the main element.
 * Each product element has an associated click behavior handled by the ShoppingCartMenu instance.
 */
product.createElements(
    data,                                          // Array of product data
    shoopingCartMenu.onClickAddToCartBehavior      // Click handler for adding products to the cart
).forEach(
    product => main.appendChild(product)           // Append each created product element to the main element
)
