import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import Error404Screen from './screens/Error404Screen.js'
import {parseRequestUrl} from './utils.js'
import CartScreen from './screens/CartScreen'
import SigninScreen from './screens/SigninScreen'
import Header from './components/Header.js'

//Object that contains screen views
const routes = {
  '/' : HomeScreen,
  '/product/:id': ProductScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
}

//Function that renders view depending of window hash
const router = async () => {

  const request = parseRequestUrl()
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '')
  //Shows content depending on url
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen
  //Constant that get main tag put there screen.
  const main = document.getElementById('main-container')
  main.innerHTML = await screen.render()

  const header = document.getElementById('header')
  header.innerHTML = await Header.render()

  await screen.after_render()

}

window.addEventListener('load', router)
window.addEventListener('hashchange', router)