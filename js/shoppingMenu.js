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

    cartMenu.querySelector('button.empty').addEventListener('click', () => {
        cartMenu.querySelectorAll('.cart-product').forEach(cartProduct => cartProduct.remove())
        total = 0;
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

    cartMenu.querySelector('button.buy').addEventListener('click', () => {
        const cartProducts = cartMenu.querySelectorAll('.cart-product')
        if (cartProducts.length) {
            alert("Compra realizada con éxito. ¡Gracias por tu compra!")
            cartProducts.forEach(cartProduct => cartProduct.remove())
            total = 0;
            cartTotal.textContent = `Total: ${total}€`
        } else {
            alert("Su carro está vacío")
        }
    })
}

emptyCartProductsBehavior()
buyCartProductsBehavior()

/**
 * Handles the behavior when a button associated with a product is clicked.
 * It either increases the product quantity in the cart if it already exists,
 * or adds the product to the cart if it's not present.
 * 
 * @param {Object} product - The product data.
 * @param {number} product.id - The ID of the product.
 * @param {string} product.name - The name of the product.
 * @param {number} product.price - The price of the product.
 * @param {number} product.stock - The available stock for the product.
 * 
 * @returns {void}
 */
const onClickAddToCartBehavior = (product) => {

    const cartProducts = cartMenu.querySelectorAll('.cart-product')
    let cartProduct = Array.from(cartProducts).find(cartProduct => cartProduct.dataset.id == product.id)
    //  If not found, cartProduct is undefined

    if (cartProduct) {
        // Increase the quantity and update the total price 
        let quantity = parseInt(cartProduct.querySelector('.quantity').textContent)
        if (quantity < product.stock) {
            cartProduct.querySelector('.quantity').textContent = `${++quantity}`
            cartTotal.textContent = `Total: ${total += product.price}€`;
        }
    } else {
        createNewCartProductElement(product)
    }
}

/**
 * Creates a new product element for the shopping cart and adds it to the cart menu.
 * 
 * @param {Object} product - The product data.
 * @param {number} product.id - The ID of the product.
 * @param {string} product.name - The name of the product.
 * @param {number} product.price - The price of the product.
 * @param {number} product.stock - The available stock for the product.
 * 
 * @returns {void}
 */
const createNewCartProductElement = (product) => {

    let cartProduct = document.createElement('article')
    cartProduct.classList.add('cart-product')
    cartProduct.setAttribute('data-id', product.id)

    cartProduct.innerHTML = `
        <p>
            ${product.name} - ${product.price}€ x <span class="quantity">1</span>
        </p>
        <div>
            <button class="delete">Eliminar</button>
            <button class="plus">+</button>
            <button class="minus">-</button>
        </div>
    `

    cartMenu.querySelector('#selected-products').append(cartProduct)
    cartTotal.textContent = `Total: ${total += product.price}€`;

    // Add event listeners for delete, plus, and minus buttons
    cartProduct.querySelector('button.delete').addEventListener('click', () => {
        let quantity = parseInt(cartProduct.querySelector('.quantity').textContent);
        cartProduct.remove()
        cartTotal.textContent = `Total: ${total -= product.price * quantity}€`;
    })

    cartProduct.querySelector('button.plus').addEventListener('click', () => {
        let quantity = parseInt(cartProduct.querySelector('.quantity').textContent);
        if (quantity < product.stock) {
            cartProduct.querySelector('.quantity').textContent = `${++quantity}`
            cartTotal.textContent = `Total: ${total += product.price}€`;
        }
    })

    cartProduct.querySelector('button.minus').addEventListener('click', () => {
        let quantity = parseInt(cartProduct.querySelector('.quantity').textContent);
        if (quantity > 1) {
            cartProduct.querySelector('.quantity').textContent = `${--quantity}`
            cartTotal.textContent = `Total: ${total -= product.price}€`;
        }
    })
}