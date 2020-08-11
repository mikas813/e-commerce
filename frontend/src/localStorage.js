//Cart getting/removing actions

//Getting product items from local storage
export const getCartItems = () => {
  //An empty array or array with products
  const cartItems = localStorage.getItem( 'cartItems' )
    ? JSON.parse( localStorage.getItem( 'cartItems' ) )
    : []
  return cartItems
}

//Setting product items to local storage
export const setCartItems = cartItems => {
  localStorage.setItem( 'cartItems', JSON.stringify( cartItems ) )
}

//Setting user data to local storage to staying signed in
export const setUserInfo = ({
  _id = '',
  name = '',
  email = '',
  password = '',
  token = '',
  isAdmin = false
  }) => {
  localStorage.setItem( 'userInfo',
    JSON.stringify( {
      _id,
      email,
      name,
      password,
      token,
      isAdmin
    } )
  )
}

//Getting user data to local storage
export const getUserInfo = () => {
  return localStorage.getItem( 'userInfo' )
    ? JSON.parse( localStorage.getItem( 'userInfo' ) )
    : {name: '', email: '', password: ''}
}