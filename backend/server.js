import express from 'express'
import cors from 'cors'
import data from './data.js'//Object with products
import mongoose from 'mongoose'
import config from './config.js'
import bodyParser from 'body-parser'
import userRouter from './routers/userRouter'
//In node.js is important to put "./" for local files because without "./" node.js is looking for in node_modules folder

//Connecting to the Mongo DB
mongoose.connect(config.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => console.log('Connected to MONGODB', ))
  .catch(error => {
  console.log('', error.reason)
})


const app = express()

app.use( cors() )//CORS to avoid error in console
app.use(bodyParser.json())
app.use('/api/users', userRouter)
app.get( '/api/products', (req, res) => {
  res.send( data.products )
} )

app.get( '/api/products/:id', (req, res) => {
  const product = data.products.find( (x) => x.id === req.params.id )
  if (product) {
    res.send( product )
  } else {
    res.status( 404 ).send( {message: 'Product not found'} )
  }
} )


app.use((err, req, res , next) => { //Handle all errors
  const status = err.name && err.name === 'ValidateError' ? 400 : 500
  res.status(status).send({
    message: err.message
  })
})


app.listen( 5000, () => {
  console.log( 'Server at http://localhost:5000' )
} )