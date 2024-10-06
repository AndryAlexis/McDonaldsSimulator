const getData = () => products

/**
 * Creates a button element and adds a click event listener to it.
 * 
 * @param {Object} data - The data that will be passed to the click event behavior.
 * @returns {HTMLButtonElement} The created button element.
 */
const createButtonElement = (data) => {
    const button = document.createElement('button')

    let quantity = undefined
    // Add click event listener to the button and pass data to the click handler
    button.addEventListener('click', (event) => onClickButtonBehavior(data, quantity))

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

    // Set the image source and alt text
    img.src = src
    img.alt = alt

    // Set default width, height, and lazy loading behavior
    img.width = 255
    img.height = 255
    img.loading = 'lazy'

    return img
}

/**
 * Creates a product element (article) with the provided product data.
 * 
 * @param {Object} data - The data of the product.
 * @param {number} data.id - The ID of the product.
 * @param {string} data.name - The name of the product.
 * @param {string} data.image - The image URL for the product.
 * @param {string} data.description - The description of the product.
 * @param {number} data.price - The price of the product.
 * @param {number} data.stock - The available stock for the product.
 * @returns {HTMLElement} The created article element representing the product.
 */
const createProductElement = (data) => {
    const article = document.createElement('article')
    article.classList.add('product')
    article.setAttribute('data-id', data.id)

    // Create and append figure and image container
    const figure = document.createElement('figure')
    const divImgContainer = document.createElement('div')
    const img = createImgElement(`./img/${data.image}`, data.description)
    divImgContainer.appendChild(img)

    // Create and append product name and description
    const h2 = document.createElement('h2')
    h2.classList.add('product-name')
    h2.textContent = data.name

    const figcaption = document.createElement('figcaption')
    figcaption.classList.add('product-description')
    figcaption.textContent = data.description

    figure.append(divImgContainer, h2, figcaption)

    // Create and append price and stock information
    const innerDiv = document.createElement('div')
    const ul = document.createElement('ul')
    const firstLi = document.createElement('li')
    firstLi.textContent = `Precio: ${data.price}€`
    const secondLi = document.createElement('li')
    secondLi.textContent = `Stock: ${data.stock}`
    ul.append(firstLi, secondLi)

    // Create and append the "Add to Cart" button
    const button = createButtonElement(data)
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
    // Select the main container where the products will be added
    const main = document.querySelector('main > div.products')

    // Iterate over each element and append it to the main container
    elements.forEach(element => {
      main.appendChild(element)  
    })
}

/**
 * Creates an array of product elements from the provided data.
 * 
 * @param {Object[]} data - An array of product data objects.
 * @param {number} data[].id - The ID of the product.
 * @param {string} data[].name - The name of the product.
 * @param {string} data[].image - The image filename for the product.
 * @param {string} data[].description - The description of the product.
 * @param {number} data[].price - The price of the product.
 * @param {number} data[].stock - The stock quantity of the product.
 * 
 * @returns {HTMLElement[]} An array of HTMLElement objects, each representing a product.
 */
const createProductElements = (data) => Array.from(data.map(info => createProductElement(info)))

const productElements = createProductElements(getData())
addElementsIntoMain(productElements)