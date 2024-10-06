/**
 * Creates a new product element for the shopping cart and adds it to the cart menu.
 * 
 * @param {Object} data - The product data.
 * @param {number} data.id - The ID of the product.
 * @param {string} data.name - The name of the product.
 * @param {number} data.price - The price of the product.
 * @param {number} data.stock - The available stock for the product.
 * 
 * @returns {void}
 */
const createNewCartProductElement = (data, quantity) => {
    // Create the cartProduct element
    cartProduct = document.createElement('article')
    cartProduct.classList.add('cart-product')
    cartProduct.setAttribute('data-id', data.id)

    // Set the innerHTML for the cart product display
    cartProduct.innerHTML = `
        <p>
            ${data.name} - ${data.price}€ x <span class="quantity">1</span>
        </p>
        <div>
            <button class="delete">Eliminar</button>
            <button class="plus">+</button>
            <button class="minus">-</button>
        </div>
    `

    // Append the new cart product to the cart menu
    cartMenu.querySelector('#selected-products').append(cartProduct)

    quantity = 1;
    cartTotal.textContent = `Total: ${total += data.price}€`;

    // Add event listeners for delete, plus, and minus buttons
    cartProduct.querySelector('button.delete').addEventListener('click', () => {
        cartProduct.remove()
        cartTotal.textContent = `Total: ${total -= data.price * quantity}€`;
    })
    
    cartProduct.querySelector('button.plus').addEventListener('click', () => {
        if (quantity < data.stock) {
            cartProduct.querySelector('.quantity').textContent = `${++quantity}`
            cartTotal.textContent = `Total: ${total += data.price}€`;
        }
    })

    cartProduct.querySelector('button.minus').addEventListener('click', () => {
        if (quantity > 1) {
            cartProduct.querySelector('.quantity').textContent = `${--quantity}`
            cartTotal.textContent = `Total: ${total -= data.price}€`;
        }
    })
}

/**
 * Handles the behavior when a button associated with a product is clicked.
 * It either increases the product quantity in the cart if it already exists,
 * or adds the product to the cart if it's not present.
 * 
 * @param {Object} data - The product data.
 * @param {number} data.id - The ID of the product.
 * @param {string} data.name - The name of the product.
 * @param {number} data.price - The price of the product.
 * @param {number} data.stock - The available stock for the product.
 * 
 * @returns {void}
 */
const onClickButtonBehavior = (data, quantity) => {
    // Find the existing cart product, if not found, cartProduct is undefined
    const cartProducts = cartMenu.querySelectorAll('.cart-product')

    // Find the cart product by matching the product ID
    let cartProduct = Array.from(cartProducts).find(cartProduct => cartProduct.dataset.id == data.id)

    if (cartProduct) {
        // Increase the quantity and update the total price if stock allows
        quantity = parseInt(cartProduct.querySelector('.quantity').textContent)
        if (quantity < data.stock) {
            cartProduct.querySelector('.quantity').textContent = `${++quantity}`
            cartTotal.textContent = `Total: ${total += data.price}€`;
        }
    } else {
        // Create a new cart product element if it doesn't exist
        createNewCartProductElement(data, quantity)
    }
}

// Cart Menu
const cartMenu = document.querySelector('#shopping-menu')
const cartTotal = cartMenu.querySelector('.total')
let total = 0;

/**
 * Attaches an event listener to the "empty" button that clears all products from the cart
 * and resets the total price to 0.
 * 
 * @returns {void}
 */
const emptyCartProductsBehavior = () => {
    // Add an event listener to the 'empty' button in the cartMenu
    cartMenu.querySelector('button.empty').addEventListener('click', () => {
        // Remove all products from the cart by iterating through each '.cart-product' element
        cartMenu.querySelectorAll('.cart-product').forEach(cartProduct => cartProduct.remove())

        // Reset the total to 0
        total = 0;
        
        // Update the cartTotal text to reflect the new total
        cartTotal.textContent = `Total: ${total}€`
    })
}

/**
 * Attaches an event listener to the "buy" button that processes the purchase of all products in the cart.
 * If the cart is not empty, it will show a confirmation alert, clear the cart, and reset the total.
 * If the cart is empty, it will display a warning message.
 * 
 * @returns {void}
 */
const buyCartProductsBehavior = () => {
    // Add an event listener to the 'buy' button in the cartMenu
    cartMenu.querySelector('button.buy').addEventListener('click', () => {
        // Select all the products currently in the cart
        const cartProducts = cartMenu.querySelectorAll('.cart-product')

        // Check if there are products in the cart
        if (cartProducts.length) {
            // Show a success alert to the user
            alert("Compra realizada con éxito. ¡Gracias por tu compra!")

            // Remove all the products from the cart
            cartProducts.forEach(cartProduct => cartProduct.remove())

            // Reset the total to 0
            total = 0;
            
            // Update the cartTotal text to reflect the new total
            cartTotal.textContent = `Total: ${total}€`
        } else {
            // If the cart is empty, show a warning alert
            alert("Su carro está vacío")
        }
    })
}

emptyCartProductsBehavior()
buyCartProductsBehavior()