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


//luego quitar esto///////////////////!!!!!!!!!!!!!!!!!!!////////////////////////
app.get('/', (req, res) => {
    res.json({
        msg: "Server ok"
    })
})

app.listen(port, () => {
    console.log(`Server online - PORT ${port}`)
})