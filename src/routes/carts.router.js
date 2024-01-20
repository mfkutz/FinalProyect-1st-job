import { Router } from "express"
import CartManager from "../class/CartManager.js"
const cartRouter = Router()

const cartManager = new CartManager('./src/carts.json')

cartRouter.get('/api/carts/:cid', async (req, res) => {
    try {
        let isId = parseInt(req.params.cid)
        const foundCart = await cartManager.getCartById(isId)
        res.status(200).send(foundCart.products)
    } catch (error) {
        res.status(400).send(`Internal server error${error}`)
    }
})

cartRouter.get('/api/carts', (req, res) => {
    res.json({
        msg: 'This is carts'
    })
})

export default cartRouter