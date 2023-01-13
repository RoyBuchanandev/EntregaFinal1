const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8086;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', require('./routes/products'));
app.use('/carts', require('./routes/carts'));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
