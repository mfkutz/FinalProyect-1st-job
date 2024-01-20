import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const port = process.env.PORT ?? 8080
const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/', productsRouter)
app.use('/', cartsRouter)

app.listen(port, () => {
    console.log(`Server online - PORT ${port}`)
})