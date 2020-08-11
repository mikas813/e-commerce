import {parseRequestUrl} from '../utils'
import {getProduct} from '../api'
import {Rating} from '../components/Rating'


const ProductScreen = {

  after_render: async () => {
    const request = parseRequestUrl()
    document.getElementById('add-button').addEventListener('click',
      () => {
        document.location.hash = `/cart/${request.id}`
      }
      )
  },

  render: async () => {
    const request = parseRequestUrl()
    const product = await getProduct(request.id)

    if (product.error) {
      return `<div>${product.error}</div>`
    }

    return `
    <div class="content">
      <div class="back_to_results">
        <a href="/#/">Back to results</a>
      </div>
      <div class="details">
        <div class="details_image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="details_info">
          <ul>
            <li>
              ${product.name}
            </li>
            <li>
              ${Rating.render({
                value: product.rating,
                text: `${product.numReviews} reviews`
              })}
            </li>
            <li>
              Price: <strong>$${product.price}</strong>
            </li>
            <li>
              Description:
              <div>
                ${product.description}
              </div>
            </li>
          </ul>
        </div>
        <div class="details_action">
          <ul>
            <li>
              Price: ${product.price}
            </li>
            <li>
              Status: 
                ${product.countInStock > 0 
                  ? `<span class="success">In stock</span>`
                  : `<span class="error">Unavailable</span> `
                }
            </li>
            <li>
              <button class="primary fw" id="add-button">
                Add to cart
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>`
  }
}

export default ProductScreen