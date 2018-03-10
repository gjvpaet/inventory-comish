const moment = require('moment');
const _ = require('lodash/object');
const mongoose = require('mongoose');

const Product = require('../models/product');
const Inventory = require('../models/inventory');

exports.getAll = async (req, res, next) => {
    try {
        let products = await Product.find()
            .select(
                '_id basePrice description sellingPrice createdAt updatedAt'
            )
            .exec();

        products = products.map(async product => {
            let inventory = await Inventory.findOne({ product: product._id })
                .select('_id quantity warningQuantity createdAt updatedAt')
                .exec();

            let productObj = {
                ...product.toObject(),
                inventory: { ...inventory.toObject() }
            };

            return productObj;
        });

        let resArr = [];

        products.map((product, index) => {
            if (index === products.length - 1) {
                product.then(result => {
                    resArr.push(result);

                    const response = {
                        list: resArr,
                        count: products.length,
                        message: 'Items successfully fetched.'
                    };

                    res.status(200).json(response);
                });
            } else {
                product.then(result => resArr.push(result));
            }
        });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};

exports.createProduct = async (req, res, next) => {
    let {
        quantity,
        basePrice,
        description,
        sellingPrice,
        warningQuantity
    } = req.body;

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        basePrice,
        description,
        sellingPrice
    });

    try {
        let createdProduct = await product.save();

        let productFields = _.pick(createdProduct, [
            '_id',
            'createdAt',
            'updatedAt',
            'basePrice',
            'description',
            'sellingPrice'
        ]);

        const inventory = new Inventory({
            _id: new mongoose.Types.ObjectId(),
            quantity,
            warningQuantity,
            product: createdProduct._id
        });

        let createdInventory = await inventory.save();

        let quantityFields = _.pick(createdInventory, [
            '_id',
            'quantity',
            'createdAt',
            'updatedAt',
            'warningQuantity'
        ]);

        const response = {
            content: { ...productFields, inventory: { ...quantityFields } },
            message: 'Item successfully created.'
        };

        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        let { productId } = req.params;
        let { basePrice, description, sellingPrice } = req.body;

        await Product.update(
            { _id: productId },
            {
                $set: {
                    basePrice,
                    description,
                    sellingPrice,
                    updatedAt: moment().format()
                }
            }
        ).exec();

        let updatedProduct = await Product.findById(productId)
            .select(
                '_id basePrice description sellingPrice createdAt updatedAt'
            )
            .exec();

        const response = {
            content: updatedProduct,
            message: 'Item successfully updated.'
        };

        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        let { productId } = req.params;

        let product = await Product.findById(productId)
            .select(
                '_id basePrice description sellingPrice createdAt updatedAt'
            )
            .exec();

        if (!product) {
            res.status(404).json({ message: 'Item not found.' });
        }

        let inventory = await Inventory.findOne({ product: product._id })
            .select('_id quantity warningQuantity createdAt updatedAt')
            .exec();

        const response = {
            content: {
                ...product.toObject(),
                inventory: { ...inventory.toObject() }
            },
            message: 'Item successfully fetched.'
        };

        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        let { productId } = req.params;

        await Inventory.findOneAndRemove({ productId });
        await Product.remove({ _id: productId });

        res.status(200).json({ message: 'Item successfully deleted.' });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};
