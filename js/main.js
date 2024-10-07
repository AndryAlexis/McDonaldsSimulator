const getData = () => products

/**
 * Creates a button element and adds a click event listener to it.
 * 
 * @param {Object} product - The product that will be passed to the click event behavior.
 * @returns {HTMLButtonElement} The created button element.
 */
const createButtonElement = (product) => {
    const button = document.createElement('button')
    button.addEventListener('click', (event) => onClickAddToCartBehavior(product))

    return button
}

/**
 * Creates an img element with the provided src and alt attributes.
 * 
 * @param {string} src - The source URL for the image.
 * @param {string} alt - The alternative text description for the image.
 * @returns {HTMLImageElement} The created img element with specified properties.
 */
const createImgElement = (src, alt) => {
    const img = document.createElement('img')
    img.src = src
    img.alt = alt
    img.width = 255
    img.height = 255
    img.loading = 'lazy'

    return img
}

/**
 * Creates a product element (article) with the provided product.
 * 
 * @param {Object} product - The data of the product.
 * @param {number} product.id - The ID of the product.
 * @param {string} product.name - The name of the product.
 * @param {string} product.image - The image URL for the product.
 * @param {string} product.description - The description of the product.
 * @param {number} product.price - The price of the product.
 * @param {number} product.stock - The available stock for the product.
 * @returns {HTMLElement} The created article element representing the product.
 */
const createProductElement = (product) => {
    const article = document.createElement('article')
    article.classList.add('product')
    article.setAttribute('data-id', product.id)

    // Create and append figure and image container
    const figure = document.createElement('figure')
    const divImgContainer = document.createElement('div')
    const img = createImgElement(`./img/${product.image}`, product.description)
    divImgContainer.appendChild(img)

    // Create and append product name and description
    const h2 = document.createElement('h2')
    h2.classList.add('product-name')
    h2.textContent = product.name

    const figcaption = document.createElement('figcaption')
    figcaption.classList.add('product-description')
    figcaption.textContent = product.description

    figure.append(divImgContainer, h2, figcaption)

    // Create and append price and stock information
    const innerDiv = document.createElement('div')
    const ul = document.createElement('ul')
    const firstLi = document.createElement('li')
    firstLi.textContent = `Precio: ${product.price}€`
    const secondLi = document.createElement('li')
    secondLi.textContent = `Stock: ${product.stock}`
    ul.append(firstLi, secondLi)

    // Create and append the "Add to Cart" button
    const button = createButtonElement(product)
    button.textContent = 'Agregar al Carrito'

    innerDiv.append(ul, button)

    // Append all elements to the article element
    article.append(figure, innerDiv)

    return article
}

/**
 * Adds an array of elements to the main product container.
 * 
 * @param {HTMLElement[]} elements - An array of HTMLElements to be added to the main product container.
 */
const addElementsIntoMain = (elements) => {

    const main = document.querySelector('main > div.products')
    elements.forEach(element => {
        main.appendChild(element)
    })
}

/**
 * Creates an array of product elements from the provided product.
 * 
 * @param {Object[]} products - An array of product objects.
 * @param {number} product[].id - The ID of the product.
 * @param {string} product[].name - The name of the product.
 * @param {string} product[].image - The image filename for the product.
 * @param {string} product[].description - The description of the product.
 * @param {number} product[].price - The price of the product.
 * @param {number} product[].stock - The stock quantity of the product.
 * 
 * @returns {HTMLElement[]} An array of HTMLElement objects, each representing a product.
 */
const createProductElements = (products) => Array.from(products.map(product => createProductElement(product)))

const productElements = createProductElements(getData())
addElementsIntoMain(productElements)


/* SHOPPING CART MENU */
// Cart Menu
const cartMenu = document.querySelector('#shopping-menu')
const cartTotal = cartMenu.querySelector('.total')
let total = 0;

emptyCartProductsBehavior(cartMenu, cartTotal)
buyCartProductsBehavior(cartMenu, cartTotal)