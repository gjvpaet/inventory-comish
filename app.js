const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const productRoutes = require('./routes/products');
const inventoryRoutes = require('./routes/inventory');
const transactionRoutes = require('./routes/transactions');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/transactions', transactionRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');

    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});