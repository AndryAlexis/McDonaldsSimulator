const getData = () => products

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

    const button = document.createElement('button')
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
