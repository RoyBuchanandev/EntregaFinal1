const router = require('express').Router();

router.route('/products')
 .get((req, res) => {
   // Implementación para obtener todos los productos
 })
 .post((req, res) => {
   // Implementación para crear un nuevo producto
 });

router.route('/carts')
 .get((req, res) => {
   // Implementación para obtener todos los carritos
 })
 .post((req, res) => {
   // Implementación para crear un nuevo carrito
 });
