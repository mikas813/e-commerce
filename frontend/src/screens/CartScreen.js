import {parseRequestUrl, rerender} from '../utils'
import {getProduct} from '../api'
import {getCartItems, setCartItems} from '../localStorage'

//Add to cart action function
const addToCart = (item, forceUpdate = false) => {

  //Array with items from localStorage
  let cartItems = getCartItems() //An empty array or with products

  const existItem = cartItems.find( x => x.product === item.product )
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map( (x) => x.product === existItem.product ? item : x )
    }
  } else {
    cartItems = [...cartItems, item]
  }

  setCartItems( cartItems )

  if (forceUpdate) {
    rerender(CartScreen)
  }
}

//Removing from cart function
const removeFromCart = (id) => {
  setCartItems(getCartItems().filter( x => x.product !== id))
  if (id === parseRequestUrl().id) {
    document.location.hash = '/cart'
  } else {
    rerender(CartScreen)
  }
}

//Cart screen object
const CartScreen = {

  after_render: () => {
    //Action that update state of cart subtotal by changing q quantity
    const qtySelects = document.getElementsByClassName('qty-select')
    Array.from(qtySelects).forEach(qtySelect => {
      qtySelect.addEventListener('change', (e) => {
        const item = getCartItems().find( x => x.product === qtySelect.id )
        addToCart({...item, qty: +e.target.value}, true)
      })
    })

    //Action that remove item from cart by clicking on delete button
    const deleteButtons = document.getElementsByClassName('delete-button')
    Array.from(deleteButtons).forEach(deleteButton => {
      deleteButton.addEventListener('click', (e) => {
        removeFromCart(deleteButton.id)
      })
    })
  },

  render: async () => {
    const request = parseRequestUrl()

    if (request.id) {
      const product = await getProduct( request.id )
      addToCart( {
        product: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1
      } )
    }

    //Array with items from localStorage
    const cartItems = getCartItems()

    return `
      <div class="cart content">
        <div class="cart-list">
          <ul class="cart-list-container">
            <li>
              <h3>Shoping cart</h3>
              <div>Price</div>
              ${
                cartItems.length === 0 
                ?'<div>Cart is empty <a href="/#/">Go Shoping</a></div>'
                : cartItems.map(item => `
                <li>
                  <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}">
                  </div>
                  <div class="cart-name">
                    <div>
                      <a href="/#/product/${item.product}">${item.name}</a>
                    </div>
                  </div>
                  <div>
                  Qty:
                  <select class="qty-select" id="${item.product}">
                  ${
                    [...Array(item.countInStock).keys()].map(x => item.qty === x+1
                       ? `<option selected value="${x+1}">${x+1}</option>`
                       :`<option value="${x+1}">${x+1}</option>`
                    )
                  }
                  </select>
                  <button type="button" class="delete-button" id="${item.product}">
                      Delete
                  </button>
                  </div>
                  <div class="cart-price">
                    $${item.price}
                  </div>
                </li>
                `).join("\n")  
              }
            </li>
          </ul>
        </div>
        <div class="cart-action">
          <h3>Subtotal (${cartItems.reduce((a,c) => a + c.qty, 0)} items)</h3>
          $${cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
        <button id="checkout-button" class="primary fw">
          Proceed to checkout
        </button>
        </div>
      </div>
    `
  }
}

export default CartScreen