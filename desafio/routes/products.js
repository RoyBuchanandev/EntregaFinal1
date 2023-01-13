const express = require('express');
const router = express.Router();
const fs = require('fs');
const fse = require('fs-extra');

let products;

try {
//Read products.json file
products = fse.readJsonSync('./products.txt');
} catch (err) {
console.error(err);
}

// Listar todos los productos con limitación
router.get('/', (req, res) => {
    let productsText = fs.readFileSync('./products.txt', 'utf-8');
    let products = JSON.parse('[' + productsText.split('\n').join('') + ']');
    const limit = req.query.limit;
    const availableProducts = products.slice(0, limit);
    res.send(availableProducts);
});


// Obtener producto por id
router.get('/:pid', (req, res) => {
const pid = req.params.pid;
//buscar producto por id
const specificProduct = products.find(product => product.id === pid);
if (!specificProduct) {
return res.status(404).json({ message: "Product not found" });
}
res.send(specificProduct);
});

// Agregar nuevo producto
router.post('/', (req, res) => {
    const { title, description, code, price, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !category) {
    return res.status(400).json({ message: "Missing required fields" });
    }
    //generar id unico
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
    id: newId,
    title,
    description,
    code,
    price,
    status: true,
    stock: 0,
    category,
    thumbnails
    };
    products.push(newProduct);
    fse.writeJsonSync('./products.json', products);
    res.json({ message: "Product added successfully", product: newProduct });
    });
    
    // Eliminar producto por id
    router.delete('/:pid', (req, res) => {
    const pid = req.params.pid;
    const productIndex = products.findIndex(product => product.id == pid);
    if (productIndex == -1) {
    return res.status(404).json({ message: "Product not found" });
    }
    products.splice(productIndex, 1);
    fse.writeJsonSync('./products.json', products);
    res.json({ message: "Product deleted successfully" });
    });

module.exports = router;