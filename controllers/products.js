const mongoose = require('mongoose');

const Product = require('../models/product');

exports.getAll = async (req, res, next) => {
    try {
        let products = await Product.find()
            .select('_id basePrice description sellingPrice')
            .exec();

        const response = {
            list: products,
            count: products.length,
            message: 'Successfully fetched data'
        };

        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};

exports.createProduct = async (req, res, next) => {
    let { basePrice, description, sellingPrice } = req.body;

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        basePrice,
        description,
        sellingPrice
    });

    try {
        let createdProduct = await product.save();

        const response = {
            content: createdProduct,
            message: 'Item successfully created.'
        };

        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};
