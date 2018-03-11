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
                    resArr.push({
                        Id: result._id,
                        Description: result.description,
                        BasePrice: result.basePrice,
                        SellinPrice: result.sellingPrice,
                        Inventory: {
                            Id: result.inventory._id,
                            Quantity: result.inventory.quantity,
                            WarningQuantity: result.inventory.warningQuantity,
                            CreatedAt: result.inventory.createdAt,
                            UpdatedAt: result.inventory.updatedAt
                        },
                        CreatedAt: result.createdAt,
                        UpdatedAt: result.updatedAt
                    });

                    const response = {
                        list: resArr,
                        count: products.length,
                        message: 'Items successfully fetched.'
                    };

                    res.status(200).json(response);
                });
            } else {
                product.then(result =>
                    resArr.push({
                        Id: result._id,
                        Description: result.description,
                        BasePrice: result.basePrice,
                        SellinPrice: result.sellingPrice,
                        Inventory: {
                            Id: result.inventory._id,
                            Quantity: result.inventory.quantity,
                            WarningQuantity: result.inventory.warningQuantity,
                            CreatedAt: result.inventory.createdAt,
                            UpdatedAt: result.inventory.updatedAt
                        },
                        CreatedAt: result.createdAt,
                        UpdatedAt: result.updatedAt
                    })
                );
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

        const inventory = new Inventory({
            _id: new mongoose.Types.ObjectId(),
            quantity,
            warningQuantity,
            product: createdProduct._id
        });

        let createdInventory = await inventory.save();

        const response = {
            content: {
                Id: createdProduct._id,
                Description: createdProduct.description,
                BasePrice: createdProduct.basePrice,
                SellingPrice: createdProduct.sellingPrice,
                Inventory: {
                    Id: createdInventory._id,
                    Quantity: createdInventory.quantity,
                    WarningQuantity: createdInventory.warningQuantity,
                    CreatedAt: createdInventory.createdAt,
                    UpdatedAt: createdInventory.updatedAt
                },
                CreatedAt: createdProduct.createdAt,
                UpdatedAt: createdProduct.updatedAt
            },
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

        let updatedProduct = await Product.findById(productId).exec();

        let inventory = await Inventory.findOne({ product: productId }).exec();

        const response = {
            content: {
                Id: updatedProduct._id,
                BasePrice: updatedProduct.basePrice,
                Description: updatedProduct.description,
                SellingPrice: updatedProduct.sellingPrice,
                Inventory: {
                    Id: inventory._id,
                    Quantity: inventory.quantity,
                    WarningQuantity: inventory.warningQuantity,
                    CreatedAt: inventory.createdAt,
                    UpdatedAt: inventory.updatedAt
                },
                CreatedAt: updatedProduct.createdAt,
                UpdatedAt: updatedProduct.updatedAt
            },
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

        let product = await Product.findById(productId).exec();

        if (!product) {
            res.status(404).json({ message: 'Item not found.' });
        }

        let inventory = await Inventory.findOne({
            product: product._id
        }).exec();

        const response = {
            content: {
                Id: product._id,
                BasePrice: product.basePrice,
                Description: product.description,
                SellingPrice: product.sellingPrice,
                Inventory: {
                    Id: inventory._id,
                    Quantity: inventory.quantity,
                    WarningQuantity: inventory.warningQuantity,
                    CreatedAt: inventory.createdAt,
                    UpdatedAt: inventory.updatedAt
                },
                CreatedAt: product.createdAt,
                UpdatedAt: product.updatedAt
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
