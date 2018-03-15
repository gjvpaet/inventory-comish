const next = require('next');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();

        const userRoutes = require('./routes/users');
        const productRoutes = require('./routes/products');
        const inventoryRoutes = require('./routes/inventory');
        const transactionRoutes = require('./routes/transactions');

        server.use(morgan('dev'));
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(bodyParser.json());

        server.use('/users', userRoutes);
        server.use('/products', productRoutes);
        server.use('/inventory', inventoryRoutes);
        server.use('/transactions', transactionRoutes);

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.use((req, res, next) => {
            const error = new Error('Not found');

            error.status = 404;
            next(error);
        });

        server.use((error, req, res, next) => {
            res.status(error.status || 500).json({
                error: {
                    message: error.message
                }
            });
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
