const express = require('express');
const router = express.Router();
const fs = require('fs');
const fse = require('fs-extra');

let carts = [];

let products = JSON.parse(fs.readFileSync('products.txt', 'utf8')) || [];

router.post('/', (req, res) => {
    try {
        let cart = {
            id: carts.length + 1,
            products: []
        };
        carts.push(cart);
        fs.writeFileSync('carrito.txt', JSON.stringify(carts));
        res.json({ message: 'Cart added', cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding cart' });
    }
});

router.get('/:cid', (req, res) => {
    let cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (!cart) {
        res.status(404).json({ message: 'Cart not found' });
        return;
    }

    let cartProducts = cart.products.map(p => {
        let product = products.find(pr => pr.id === p.id);
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: p.quantity
        }
    });

    res.json({ cart: cartProducts });
});

router.post('/:cid/product/:pid', (req, res) => {
    try {
        let cart = carts.find(c => c.id === parseInt(req.params.cid));
        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
            return;
        }
        let productIndex = cart.products.findIndex(p => p.id === parseInt(req.params.pid));
        if (productIndex === -1) {
            cart.products.push({ id: parseInt(req.params.pid), quantity: 1 });
        } else {
            cart.products[productIndex].quantity++;
        }
        fs.writeFileSync('carrito.txt', JSON.stringify(carts));
        res.json({ message: 'Product added to cart', cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding product to cart' });
    }
});

router.put('/:cid', (req, res) => {
    try {
        let cart = carts.find(c => c.id === parseInt(req.params.cid));
        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
            return;
        }
        cart.products = req.body.products;
        fs.writeFileSync('carrito.txt', JSON.stringify(carts));
        res.json({ message: 'Cart updated', cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating cart' });
    }
});

router.delete('/:cid', (req, res) => {
    try {
        let cartIndex = carts.findIndex(c => c.id === parseInt(req.params.cid));
        if (cartIndex === -1) {
            res.status(404).json({ message: 'Cart not found' });
            return;
        }
        carts.splice(cartIndex, 1);
        fs.writeFileSync('carrito.txt', JSON.stringify(carts));
        res.json({ message: 'Cart deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting cart' });
    }
});


module.exports = router;
