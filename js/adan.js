import { products } from "/js/data/data.js"; // relies on HTTP

// Cart Panel
const cartPanel = document.createElement('aside')
cartPanel.classList.add('cart-panel', 'disabled')
cartPanel.innerHTML = `
    <h3>Carrito de Compras</h3>
    <span class="total">Total: 0€</span>
    <button class="empty">Vaciar carrito</button>
    <button class="buy">Proceder a comprar</button>
`
document.querySelector('body').append(cartPanel)
const cartTotal = cartPanel.querySelector('.total')
let total = 0;

document.querySelector('.cart').addEventListener('click', () => {
    cartPanel.classList.toggle('disabled')
})
cartPanel.querySelector('.empty').addEventListener('click', () => {
    cartPanel.querySelectorAll('.cart-product').forEach(cartProduct => cartProduct.remove())
    total = 0;
    cartTotal.textContent = `Total: ${total}€`
})
cartPanel.querySelector('.buy').addEventListener('click', () => {
    const cartProducts = cartPanel.querySelectorAll('.cart-product')

    if (cartProducts.length) {
        alert("Compra realizada con éxito. !Gracias por tu compra!")
        cartProducts.forEach(cartProduct => cartProduct.remove())
        total = 0;
        cartTotal.textContent = `Total: ${total}€`
    } else
        alert("Su carro está vacío")
})


// Products 
const addToCartButtons = document.querySelectorAll('.product button')
for (let button of addToCartButtons) {

    // Product
    const name = button.closest('.product').querySelector('.name').textContent
    const product = products.find(product => product.name === name)
    let quantity = undefined;

    button.addEventListener('click', () => {

        // Find cartProduct, if not found cartProduct = undef
        const cartProducts = cartPanel.querySelectorAll('.cart-product')
        let cartProduct = Array.from(cartProducts)
            .find(cartProduct => cartProduct.querySelector('.name').textContent === product.name)

        if (cartProduct) {
            // Increase quantity and total 
            quantity = parseInt(cartProduct.querySelector('.quantity').textContent)
            if (quantity < product.stock) {
                cartProduct.querySelector('.quantity').textContent = `${++quantity}`
                cartTotal.textContent = `Total: ${total += product.price}€`;
            }
        }
        else {
            // Create the cartProduct
            cartProduct = document.createElement('article')
            cartProduct.classList.add('cart-product')
            cartProduct.innerHTML = `
            <div class="produdct-info">
                <span class="name">${product.name}</span>
                <span class="price">${product.price}€</span>
                <span class="quantity">1</span>
            </div>
            <div class="controls">
                <button class="delete">Eliminar</button>
                <button class="plus">+</button>
                <button class="minus">-</button>
            </div>
            `
            cartPanel.querySelector('.total').before(cartProduct)

            quantity = 1;
            cartTotal.textContent = `Total: ${total += product.price}€`;

            // addEventListeners to Buttons
            cartProduct.querySelector('button.minus').addEventListener('click', () => {
                if (quantity > 1) {
                    cartProduct.querySelector('.quantity').textContent = `${--quantity}`
                    cartTotal.textContent = `Total: ${total -= product.price}€`;
                }
            })
            cartProduct.querySelector('button.plus').addEventListener('click', () => {
                if (quantity < product.stock) {
                    cartProduct.querySelector('.quantity').textContent = `${++quantity}`
                    cartTotal.textContent = `Total: ${total += product.price}€`;
                }
            })
            cartProduct.querySelector('button.delete').addEventListener('click', () => {
                cartProduct.remove()
                cartTotal.textContent = `Total: ${total -= product.price * quantity}€`;
            })
        }
    })
}
