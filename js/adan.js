// Cart Menu
const cartMenu = document.querySelector('#shopping-menu')
const cartTotal = cartMenu.querySelector('.total')
let total = 0;

cartMenu.querySelector('button.empty').addEventListener('click', () => {
    cartMenu.querySelectorAll('.cart-product').forEach(cartProduct => cartProduct.remove())
    total = 0;
    cartTotal.textContent = `Total: ${total}€`
})
cartMenu.querySelector('button.buy').addEventListener('click', () => {
    const cartProducts = cartMenu.querySelectorAll('.cart-product')

    if (cartProducts.length) {
        alert("Compra realizada con éxito. ¡Gracias por tu compra!")
        cartProducts.forEach(cartProduct => cartProduct.remove())
        total = 0;
        cartTotal.textContent = `Total: ${total}€`
    } else
        alert("Su carro está vacío")
})


// Add to Cart 
const addToCartButtons = document.querySelectorAll('.product button')
for (let button of addToCartButtons) {

    // Product info
    const id = button.closest('.product').dataset.id
    const product = products.find(product => product.id == id)
    let quantity = undefined;

    button.addEventListener('click', () => {

        // Find cartProduct in cartMenu, if not found cartProduct = undef
        const cartProducts = cartMenu.querySelectorAll('.cart-product')
        let cartProduct = Array.from(cartProducts)
            .find(cartProduct => cartProduct.dataset.id == product.id)

        if (cartProduct) {
            // If found increase quantity and total 
            quantity = parseInt(cartProduct.querySelector('.quantity').textContent)
            if (quantity < product.stock) {
                cartProduct.querySelector('.quantity').textContent = `${++quantity}`
                cartTotal.textContent = `Total: ${total += product.price}€`;
            }
        } else {
            // Create the cartProduct
            cartProduct = document.createElement('article')
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

            quantity = 1;
            cartTotal.textContent = `Total: ${total += product.price}€`;

            // addEventListeners to Buttons
            cartProduct.querySelector('button.delete').addEventListener('click', () => {
                cartProduct.remove()
                cartTotal.textContent = `Total: ${total -= product.price * quantity}€`;
            })
            cartProduct.querySelector('button.plus').addEventListener('click', () => {
                if (quantity < product.stock) {
                    cartProduct.querySelector('.quantity').textContent = `${++quantity}`
                    cartTotal.textContent = `Total: ${total += product.price}€`;
                }
            })
            cartProduct.querySelector('button.minus').addEventListener('click', () => {
                if (quantity > 1) {
                    cartProduct.querySelector('.quantity').textContent = `${--quantity}`
                    cartTotal.textContent = `Total: ${total -= product.price}€`;
                }
            })
        }
    })
}
