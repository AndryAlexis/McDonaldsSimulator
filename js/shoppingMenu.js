/**
 * Class representing a shopping cart menu with add-to-cart functionality.
 */
export default class ShoppingCartMenu {
    // Constant variables for TAG, CLASS, ID, EVENT, ATTRIBUTE names
    TAG = {
        BUTTON: 'button',
        ARTICLE: 'article'
    }

    CLASS = {
        QUANTITY: 'quantity',
        MINUS: 'minus',
        DELETE: 'delete',
        CART_PRODUCT: 'cart-product',
        PLUS: 'plus',
        BUY: 'buy',
        EMPTY: 'empty',
        TOTAL: 'total'
    }

    ID = {
        SELECTED_PRODUCTS: 'selected-products',
        SHOPPING_MENU: 'shopping-menu'
    }

    EVENT = {
        CLICK: 'click'
    }

    ATTRIBUTE = {
        DATA_ID: 'data-id'
    }

    PRODUCTS_BY_DEFAULT = 1

    /**
     * Constructor for the shopping cart menu.
     * @param {string} textOfTotalCart - Text shown before the total amount.
     * @param {string} typeofCurrency - The currency symbol.
     * @param {string} deleteButtonText - Text for the delete button.
     * @param {string} plusButtonText - Text for the plus button.
     * @param {string} minusButtonText - Text for the minus button.
     * @param {string} succesMessageText - Success message when the purchase is completed.
     * @param {string} emptyCartMessageText - Message when the cart is empty.
     */
    constructor(
        textOfTotalCart, typeofCurrency,
        deleteButtonText, plusButtonText,
        minusButtonText, succesMessageText,
        emptyCartMessageText
    ) {
        this.textOfTotalCart = textOfTotalCart
        this.typeofCurrency = typeofCurrency
        this.deleteButtonText = deleteButtonText
        this.plusButtonText = plusButtonText
        this.minusButtonText = minusButtonText
        this.succesMessageText = succesMessageText
        this.emptyCartMessageText = emptyCartMessageText

        this.total = 0 // Tracks the total price in the cart

        this.emptyCartProductsBehavior()
        this.buyCartProductsBehavior()
    }

    /**
     * Adds an event listener to the empty cart button that clears the cart and resets the total.
     */
    emptyCartProductsBehavior() {
        const cartMenu = document.querySelector(`#${this.ID.SHOPPING_MENU}`)
        const cartTotal = cartMenu.querySelector(`.${this.CLASS.TOTAL}`)

        cartMenu
            .querySelector(`${this.TAG.BUTTON}.${this.CLASS.EMPTY}`)
            .addEventListener(this.EVENT.CLICK, () => {
                cartMenu.querySelectorAll(`.${this.CLASS.CART_PRODUCT}`).forEach(cartProduct => cartProduct.remove()) // Removes all products
                this.total = 0; // Resets total
                cartTotal.textContent = `${this.textOfTotalCart}${this.total}${this.typeofCurrency}` // Updates total text
            })
    }

    /**
     * Adds an event listener to the buy button that processes the purchase or shows an alert if the cart is empty.
     */
    buyCartProductsBehavior() {
        const cartMenu = document.querySelector(`#${this.ID.SHOPPING_MENU}`)
        const cartTotal = cartMenu.querySelector(`.${this.CLASS.TOTAL}`)

        cartMenu
            .querySelector(`${this.TAG.BUTTON}.${this.CLASS.BUY}`)
            .addEventListener(this.EVENT.CLICK, () => {
                const cartProducts = cartMenu.querySelectorAll(`.${this.CLASS.CART_PRODUCT}`)
                if (cartProducts.length) {
                    alert(this.succesMessageText) // Purchase successful message
                    cartProducts.forEach(cartProduct => cartProduct.remove()) // Clears cart
                    this.total = 0;
                    cartTotal.textContent = `${this.textOfTotalCart}${this.total}${this.typeofCurrency}` // Resets total
                } else {
                    alert(this.emptyCartMessageText) // Shows alert when cart is empty
                }
            })
    }

    /**
     * Adds a product to the cart or increments its quantity if it already exists in the cart.
     * @param {Object} product - The product object to add.
     */
    onClickAddToCartBehavior = (product) => {
        const cartMenu = document.querySelector(`#${this.ID.SHOPPING_MENU}`)
        const cartTotal = cartMenu.querySelector(`.${this.CLASS.TOTAL}`)
        const cartProducts = cartMenu.querySelectorAll(`.${this.CLASS.CART_PRODUCT}`)
        let cartProduct = Array.from(cartProducts).find(cartProduct => cartProduct.dataset.id == product.id)

        // If product is already in the cart, increment its quantity
        if (cartProduct) {
            let quantity = parseInt(cartProduct.querySelector(`.${this.CLASS.QUANTITY}`).textContent)
            if (quantity < product.stock) {
                cartProduct.querySelector(`.${this.CLASS.QUANTITY}`).textContent = `${++quantity}`
                cartTotal.textContent = `${this.textOfTotalCart}${this.total += product.price}${this.typeofCurrency}`;
            }
        } else {
            this.createNewCartProductElement(product) // If not, add a new product to the cart
        }
    }

    /**
     * Creates a new product element in the cart and sets up event listeners for delete, plus, and minus buttons.
     * @param {Object} product - The product object to create.
     */
    createNewCartProductElement(product) {
        let cartProduct = document.createElement(`${this.TAG.ARTICLE}`)
        cartProduct.classList.add(`${this.CLASS.CART_PRODUCT}`)
        cartProduct.setAttribute(`${this.ATTRIBUTE.DATA_ID}`, product.id)

        cartProduct.innerHTML = `
            <p>
                ${product.name} - ${product.price}${this.typeofCurrency} x <span class="${this.CLASS.QUANTITY}">${this.PRODUCTS_BY_DEFAULT}</span>
            </p>
            <div>
                <button class="${this.CLASS.DELETE}">${this.deleteButtonText}</button>
                <button class="${this.CLASS.PLUS}">${this.plusButtonText}</button>
                <button class="${this.CLASS.MINUS}">${this.minusButtonText}</button>
            </div>
        `

        const cartMenu = document.querySelector(`#${this.ID.SHOPPING_MENU}`)
        const cartTotal = cartMenu.querySelector(`.${this.CLASS.TOTAL}`)
        cartMenu.querySelector(`#${this.ID.SELECTED_PRODUCTS}`).append(cartProduct)

        cartTotal.textContent = `${this.textOfTotalCart}${this.total += product.price}${this.typeofCurrency}`

        // Event listener for deleting product from cart
        cartProduct
            .querySelector(`${this.TAG.BUTTON}.${this.CLASS.DELETE}`)
            .addEventListener(this.EVENT.CLICK, () => {
                let quantity = parseInt(cartProduct.querySelector(`.${this.CLASS.QUANTITY}`).textContent);
                cartProduct.remove() // Remove product from cart
                cartTotal.textContent = `${this.textOfTotalCart}${this.total -= product.price * quantity}${this.typeofCurrency}`; // Update total
            })

        // Event listener for increasing product quantity
        cartProduct
            .querySelector(`${this.TAG.BUTTON}.${this.CLASS.PLUS}`)
            .addEventListener(this.EVENT.CLICK, () => {
                let quantity = parseInt(cartProduct.querySelector(`.${this.CLASS.QUANTITY}`).textContent);
                if (quantity < product.stock) {
                    cartProduct.querySelector(`.${this.CLASS.QUANTITY}`).textContent = `${++quantity}`
                    cartTotal.textContent = `${this.textOfTotalCart}${this.total += product.price}${this.typeofCurrency}`;
                }
            })

        // Event listener for decreasing product quantity
        cartProduct
            .querySelector(`${this.TAG.BUTTON}.${this.CLASS.MINUS}`)
            .addEventListener(this.EVENT.CLICK, () => {
                let quantity = parseInt(cartProduct.querySelector(`.${this.CLASS.QUANTITY}`).textContent);
                if (quantity > this.PRODUCTS_BY_DEFAULT) {
                    cartProduct.querySelector(`.${this.CLASS.QUANTITY}`).textContent = `${--quantity}`
                    cartTotal.textContent = `${this.textOfTotalCart}${this.total -= product.price}${this.typeofCurrency}`;
                }
            })
    }
}