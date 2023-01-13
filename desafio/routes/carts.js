const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('carts');
});

router.post('/', (req, res) => {
    res.send('Add cart');
});

router.put('/:id', (req, res) => {
    res.send(`Update cart ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete cart ${req.params.id}`);
});

module.exports = router;
