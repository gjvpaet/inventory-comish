const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const inventoryRoutes = require('./routes/inventory');
const transactionRoutes = require('./routes/transactions');

mongoose.connect('mongodb://127.0.0.1/inventory');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRoutes);
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

module.exports = app;