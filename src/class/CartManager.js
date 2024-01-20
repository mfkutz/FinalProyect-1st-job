import ProductManager from './ProductManager.js'
import fs from 'fs'

class CartManager {
    constructor(pathFile) {
        this.path = pathFile
        this.id = 0
        this.initialize()
    }

    async initialize() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.carts = JSON.parse(data) || []
            this.id = this.calculateNextId()
        } catch (error) {
            console.error(`Error initializing CartManager: ${error}`)
            throw error
        }
    }

    calculateNextId() {
        const calcMaxId = this.carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0)
        return calcMaxId + 1
    }

    async createCart() {
        const newId = this.calculateNextId()
        const cartReady = {
            id: newId,
            products: []
        }
        this.carts.push(cartReady)
        //Writing file
        const newList = JSON.stringify(this.carts, null, 2)
        try {
            await fs.promises.writeFile(this.path, newList, 'utf-8')
            console.log('New cart created (msg from console.log)')
            console.log(newList)
            return 'New cart created'
        } catch (error) {
            console.error('Error writing to file', error)
            return 'Error writing to file'
        }
    }

    async getCarts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }

    async getCartById(id) {
        const carts = await this.getCarts()
        const foundCart = carts.find(cart => cart.id === id)
        return foundCart || 'Not found'
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const carts = await this.getCarts(cartId)
        const foundCart = carts.find(cart => cart.id === cartId)
        /* console.log(foundCart) */

        if (foundCart) {
            const productManager = new ProductManager('../products.json')
            const foundProduct = await productManager.getProductBytId(productId)
            /* console.log('found product',foundProduct) */

            if (foundProduct !== 'Not found') {

                console.log('El producto existe, hay que ver como hacemos el push')
                const existingProduct = foundCart.products.find(prod => prod.id === foundProduct.id)

                if (existingProduct) {
                    existingProduct.quantity += quantity
                } else {
                    const cartStruct = {
                        product: foundProduct.id,
                        quantity: quantity
                    }

                    foundCart.products.push(cartStruct)
                }


                console.log(foundCart)

            } else {
                console.log('Product not found')
            }

        } else {
            console.log('Cart not found')
            return null
        }
    }
}


//test
(async () => {
    const cartManager = new CartManager('../carts.json')
    await cartManager.initialize()

    /* cartManager.createCart() */

    //Obtener y mostrar todos los carritos
    /* cartManager.getCarts()
        .then(res => console.log(res))
        .catch(error => console.log(error)) */

    //Mostrar producto especifico
    /* cartManager.getCartById(2)
        .then(res => console.log(res))
        .catch(error => console.log(error)) */

    //Agregar producto al carrito
    cartManager.addProductToCart(1, 1)




})()


export default CartManager