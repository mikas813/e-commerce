import express from 'express'
import cors from 'cors'
import data from './data.js'//Object with products
//In node.js is important to put "./" for local files because without "./" node.js is looking for in node_modules folder

const app = express()

app.use(cors())//CORS to avoid error in console

app.get('/api/products', (req, res) => {
  res.send(data.products)
})

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x.id === req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({message:'Product not found'})
  }
})

app.listen(5000, () => {
  console.log('server at http://localhost:5000', )
})