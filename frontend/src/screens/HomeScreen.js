import axios from 'axios'
import {Rating} from '../components/Rating'

const HomeScreen = {
  render: async () => {

    //Getting data from server using 'axios'
    const response = await axios( {
      url: 'http://localhost:5000/api/products',
      headers: {
        'Content-Type': 'application/json'
      }
    } )
    if (!response || response.statusText !== 'OK') {
      return `<div>Error in getting data</div>`
    }
    const products = response.data
    //Getting data from server

    return `
      <ul class="products">
        ${products.map( product => `
        <li>
            <div class="product">
              <a href="/#/product/${product.id}">
                <img src="${product.image}" alt="${product.name}"/>
                <div class="product-name">
                  <a href="/#/product/1">
                    ${product.name}
                  </a>
                </div>
                <div class="product-rating">
                    ${Rating.render({
                      value: product.rating, 
                      text: `${product.numReviews} rewiews`}
                      )}
                </div>
                <div class="product-brand">
                  ${product.brand}
                </div>
                <div class="product-price">
                  $${product.price}
                </div>
              </a>
            </div>
          </li>
      ` ).join( '\n' )}
      </ul>  
    `
  }
}

export default HomeScreen