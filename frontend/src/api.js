import {apiUrl} from './config'
import axios from 'axios'

//Getting products array from back-end
export const getProduct = async (id) => {

  try {
    const response = await axios( {
      url: `${apiUrl}/api/products/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    } )

    if (response.statusText !== 'OK') {
      throw new Error( response.data.message )
    }

    return response.data

  } catch (err) {
    console.log( '', err )
    return {error: err.response.data.message || err.message}
  }
}

export const signin = async ({email, password}) => {
  try {
    const response = await axios( {
      url: `${apiUrl}/api/users/signin`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email,
        password
      }
    } )

    if (response.statusText !== 'OK') {
      throw new Error( response.data.message )
    }

    return response.data

  } catch (e) {
    console.log( '', e )
    return {error: e.response.data.message || e.message}
  }
}