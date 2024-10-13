/**
 * Class representing a product and its associated elements.
 */
export default class Product {
    // HTML tag names used throughout the class
    TAG = {
        ARTICLE: 'article',
        FIGURE: 'figure',
        DIV: 'div',
        H2: 'h2',
        FIGCAPTION: 'figcaption',
        UL: 'ul',
        LI: 'li',
        IMG: 'img',
        BUTTON: 'button'
    }

    // CSS class names to be applied to elements
    CLASS = {
        PRODUCT: 'product',                 // CSS class for the product element
        PRODUCT_NAME: 'product-name',       // CSS class for the product name element
        PRODUCT_DESCRIPTION: 'product-description'  // CSS class for the product description
    }

    // Data attributes and events used in the elements
    ATTRIBUTE = {
        DATA_ID: 'data-id'  // Used to uniquely identify products
    }
    
    EVENT = {
        CLICK: 'click'  // Event type for button clicks
    }

    /**
     * Constructor for the Product class.
     * @param {Object} image - Object representing image attributes (width, height, etc.).
     * @param {string} buttonText - Text for the button.
     * @param {string} priceText - Text to display before the product price.
     * @param {string} stockText - Text to display before the product stock.
     * @param {string} typeOfCurrency - The type of currency to display (e.g., "$").
     */
    constructor(image, buttonText, priceText, stockText, typeOfCurrency) {
        this.image = image               // Image properties such as width, height, etc.
        this.buttonText = buttonText     // Text that will appear on the product button
        this.priceText = priceText       // Text shown before the price (e.g., "Price: ")
        this.stockText = stockText       // Text shown before the stock (e.g., "Stock: ")
        this.typeOfCurrency = typeOfCurrency  // Currency symbol (e.g., "$")
    }

    /**
     * Creates an img element with the provided attributes.
     * @param {string} src - Source URL for the image.
     * @param {string} alt - Alternative text for the image.
     * @returns {HTMLImageElement} The created img element.
     */
    createImgElement(src, alt) {
        const img = document.createElement(this.TAG.IMG)  // Create an <img> element
        img.src = src                                     // Set the source of the image
        img.alt = alt                                     // Set alt text for the image
        img.width = this.image.width                      // Set image width
        img.height = this.image.height                    // Set image height
        img.loading = this.image.loadType                 // Set the image loading type (lazy, eager)

        return img  // Return the created image element
    }

    /**
     * Creates a button element with a click event listener.
     * @param {function} handlerButton - Function to handle button clicks.
     * @returns {HTMLButtonElement} The created button element.
     */
    createButtonElement(handlerButton) {
        const button = document.createElement(this.TAG.BUTTON)  // Create a <button> element
        button.addEventListener(this.EVENT.CLICK, handlerButton) // Add a click event listener
        return button  // Return the created button element
    }

    /**
     * Creates a product element containing image, name, description, price, stock, and a button.
     * @param {object} product - Object representing the product.
     * @param {function} handlerButton - Function for handling button clicks.
     * @returns {HTMLElement} The created product HTML element.
     */
    createElement(product, handlerButton) {
        // Create the main article element for the product
        const article = document.createElement(this.TAG.ARTICLE)
        article.classList.add(this.CLASS.PRODUCT)  // Apply product class
        article.setAttribute(this.ATTRIBUTE.DATA_ID, product.id)  // Set data-id attribute to the product ID

        // Create the figure element with image and caption
        const figure = document.createElement(this.TAG.FIGURE)
        const divImgContainer = document.createElement(this.TAG.DIV)  // Container for the image
        const img = this.createImgElement(`${this.image.rootPathFolder}${product.image}`, product.description)
        divImgContainer.appendChild(img)  // Append the image to the container

        // Create the product name
        const h2 = document.createElement(this.TAG.H2)   // Create an <h2> element for the product name
        h2.classList.add(this.CLASS.PRODUCT_NAME)        // Add the product-name class
        h2.textContent = product.name                    // Set the product name text

        // Create the product description
        const figcaption = document.createElement(this.TAG.FIGCAPTION)   // Create the <figcaption> element
        figcaption.classList.add(this.CLASS.PRODUCT_DESCRIPTION)         // Add the product-description class
        figcaption.textContent = product.description                     // Set the description text

        // Append the image container, product name, and description to the figure
        figure.append(divImgContainer, h2, figcaption)

        // Create the price, stock, and button section
        const innerDiv = document.createElement(this.TAG.DIV)  // Container for price, stock, and button
        const ul = document.createElement(this.TAG.UL)  // Create an unordered list (ul) to display price and stock

        // Create list items for price and stock
        const firstLi = document.createElement(this.TAG.LI)  // Create a list item for the price
        firstLi.textContent = `${this.priceText}${product.price}${this.typeOfCurrency}`  // Display price with currency
        const secondLi = document.createElement(this.TAG.LI)  // Create a list item for the stock
        secondLi.textContent = `${this.stockText}${product.stock}`  // Display stock quantity
        ul.append(firstLi, secondLi)  // Append both list items to the ul

        // Create the button for adding the product to the cart
        const button = this.createButtonElement(_ => handlerButton(product))  // Create button with click handler
        button.textContent = `${this.buttonText}`  // Set the button text

        innerDiv.append(ul, button)  // Append the ul and button to the container div

        // Append the figure and inner div to the article
        article.append(figure, innerDiv)

        return article  // Return the complete product element
    }

    /**
     * Creates an array of product elements.
     * @param {Array} products - Array of product objects.
     * @param {function} handlerButton - Function to handle button clicks for each product.
     * @returns {Array<HTMLElement>} Array of created product elements.
     */
    createElements(products, handlerButton) {
        // Map through the products array, creating a product element for each, and return the array of elements
        return Array.from(products.map(product => this.createElement(product, handlerButton)))  
    }
}