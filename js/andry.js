import { products } from "./data/data";

const getData = () => products

const createNewCartProductElement = () => {
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

const onClickButtonBehavior = ({ target : button, id}) => {
    // Product info
    const id = button.closest('.product').dataset.id
    const product = products.find(product => product.id == id)
    let quantity = undefined;

    button.addEventListener('click', () => {
        // Find cartProduct, if not found cartProduct = undef
        const cartProducts = cartMenu.querySelectorAll('.cart-product')
        let cartProduct = Array.from(cartProducts)
            .find(cartProduct => cartProduct.dataset.id == product.id)

        if (cartProduct) {
            // Increase quantity and total 
            quantity = parseInt(cartProduct.querySelector('.quantity').textContent)
            if (quantity < product.stock) {
                cartProduct.querySelector('.quantity').textContent = `${++quantity}`
                cartTotal.textContent = `Total: ${total += product.price}€`;
            }
        } else {

        }
    })
}

const createButtonElement = (data) => {
    const button = document.createElement('button')

    button.addEventListenerU('click', (event) => onClickButtonBehavior(event, data))

    return button
}

const createImgElement = (src, alt) => {
    const img = document.createElement('img')
    img.src = src
    img.alt = alt
    img.width = 255
    img.height = 255
    img.loading = 'lazy'
    return img
}

const createProductElement = (data) => {
    const article = document.createElement('article')
    article.classList.add('product')
    article.setAttribute('data-id', data.id)

    const figure = document.createElement('figure')

    const divImgContainer = document.createElement('div')
    const img = createImgElement(`./img/${data.image}`, data.description)

    divImgContainer.appendChild(img)

    const h2 = document.createElement('h2')
    h2.classList.add('product-name')
    h2.textContent = data.name

    const figcaption = document.createElement('figcaption')
    figcaption.classList.add('product-description')
    figcaption.textContent = data.description

    figure.append(divImgContainer, h2, figcaption)

    const innerDiv = document.createElement('div')
    const ul = document.createElement('ul')
    const firstLi = document.createElement('li')
    firstLi.textContent = `Precio: ${data.price}€`
    const secondLi = document.createElement('li')
    secondLi.textContent = `Stock: ${data.stock}`
    ul.append(firstLi, secondLi)

    const button = createButtonElement(data)
    button.textContent = 'Agregar al Carrito'
    
    innerDiv.append(ul, button)

    article.append(figure, innerDiv)

    return article
}

const addElementsIntoMain = (elements) => {
    const main = document.querySelector('main > div.products')

    elements.forEach(element => {
      main.appendChild(element)  
    })
}

const createProductElements = (data) => Array.from(data.map(info => createProductElement(info)))

const productElements = createProductElements(getData())
addElementsIntoMain(productElements)


// Cart Menu
const cartMenu = document.querySelector('#shopping-menu')
const cartTotal = cartMenu.querySelector('.total')
let total = 0;

cartMenu.querySelector('.empty').addEventListener('click', () => {
    cartMenu.querySelectorAll('.cart-product').forEach(cartProduct => cartProduct.remove())
    total = 0;
    cartTotal.textContent = `Total: ${total}€`
})
cartMenu.querySelector('.buy').addEventListener('click', () => {
    const cartProducts = cartMenu.querySelectorAll('.cart-product')

    if (cartProducts.length) {
        alert("Compra realizada con éxito. !Gracias por tu compra!")
        cartProducts.forEach(cartProduct => cartProduct.remove())
        total = 0;
        cartTotal.textContent = `Total: ${total}€`
    } else
        alert("Su carro está vacío")
})


// Add to Cart 
const addToCartButtons = document.querySelectorAll('.product button')
for (let button of addToCartButtons) {

    
}
