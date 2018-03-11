const moment = require('moment');
const _ = require('lodash/object');
const mongoose = require('mongoose');

const Product = require('../models/product');
const Inventory = require('../models/inventory');

exports.getAll = async (req, res, next) => {
    try {
        let products = await Product.find()
            .populate('inventory')
            .exec();

        const response = {
            list: products.map(product => {
                return {
                    Id: product._id,
                    BasePrice: product.basePrice,
                    Description: product.description,
                    SellingPrice: product.sellingPrice,
                    Inventory: {
                        Id: product.inventory._id,
                        Quantity: product.inventory.quantity,
                        WarningQuantity: product.inventory.warningQuantity,
                        CreatedAt: product.inventory.createdAt,
                        UpdatedAt: product.inventory.updatedAt
                    },
                    CreatedAt: product.createdAt,
                    UpdatedAt: product.updatedAt
                };
            }),
            count: products.length,
            message: 'Items successfully fetched.'
        };

        res.status(200).json(response);
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

    try {
        const inventory = new Inventory({
            _id: new mongoose.Types.ObjectId(),
            quantity,
            warningQuantity
        });

        let createdInventory = await inventory.save();

        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            basePrice,
            description,
            sellingPrice,
            inventory: inventory._id
        });

        let createdProduct = await product.save();

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

        let updatedProduct = await Product.findById(productId)
            .populate('inventory')
            .exec();

        const response = {
            content: {
                Id: updatedProduct._id,
                BasePrice: updatedProduct.basePrice,
                Description: updatedProduct.description,
                SellingPrice: updatedProduct.sellingPrice,
                Inventory: {
                    Id: updatedProduct.inventory._id,
                    Quantity: updatedProduct.inventory.quantity,
                    WarningQuantity: updatedProduct.inventory.warningQuantity,
                    CreatedAt: updatedProduct.inventory.createdAt,
                    UpdatedAt: updatedProduct.inventory.updatedAt
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

        let product = await Product.findById(productId)
            .populate('inventory')
            .exec();

        if (!product) {
            res.status(404).json({ message: 'Item not found.' });
        }

        const response = {
            content: {
                Id: product._id,
                BasePrice: product.basePrice,
                Description: product.description,
                SellingPrice: product.sellingPrice,
                Inventory: {
                    Id: product.inventory._id,
                    Quantity: product.inventory.quantity,
                    WarningQuantity: product.inventory.warningQuantity,
                    CreatedAt: product.inventory.createdAt,
                    UpdatedAt: product.inventory.updatedAt
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

        let deletedProduct = await Product.findOneAndRemove(productId);
        await Inventory.remove({ _id: deletedProduct.inventory._id });

        res.status(200).json({ message: 'Item successfully deleted.' });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};
