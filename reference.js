const express = require('express')
const ProductManager = require('./ProductManager') //import OK
const app = express()
const PORT = 8080

const productManager = new ProductManager('./src/products.json')
productManager.initialize()
    .then(() => {
        app.listen(PORT, console.log(`Server online - Port ${PORT}`))
    })
    .catch(error => console.error(error))
    

app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || undefined;
        const allProducts = await productManager.getProducts();

        if (limit) {
            const limitedProducts = allProducts.slice(0, limit);
            res.json(limitedProducts);
        } else {
            res.json(allProducts);
        }
    } catch (error) {
        res.send('Internal Server Error');
    }
})


app.get('/products/:id', async (req, res) => {
    try {
        let isId = parseInt(req.params.id, 10)
        const foundProduct = await productManager.getProductBytId(isId)

        if (foundProduct !== 'Not found') {
            res.json(foundProduct)
        } else {
            res.send(`Product with ID ${req.params.id} not found`)
        }
    } catch (error) {
        res.send(`Ups...Something went wrong`)
    }
})
