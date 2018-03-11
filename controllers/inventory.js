const moment = require('moment');
const mongoose = require('mongoose');

const Product = require('../models/product');
const Inventory = require('../models/inventory');
const Transaction = require('../models/transaction');

exports.modifyStock = async (req, res, next) => {
    let { inventoryId } = req.params;
    let { qty, type } = req.body;

    try {
        let inventory = await Inventory.findByIdAndUpdate(inventoryId, {
            $inc: {
                quantity: type === 'ADD' ? qty : type === 'SUBTRACT' ? -qty : 0
            },
            $set: { updatedAt: moment().format() }
        }).exec();

        let updatedInventory = await Inventory.findById(inventoryId).exec();

        let product = await Product.findOne({
            inventory: updatedInventory._id
        });

        let transaction = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            originalQuantity: inventory.quantity,
            quantity: qty,
            newQuantity: updatedInventory.quantity,
            totalPrice:
                type === 'ADD'
                    ? product.basePrice * qty
                    : type === 'SUBTRACT'
                        ? product.sellingPrice * qty
                        : null,
            transactionType: type,
            product: product._id
        });

        await transaction.save();

        const response = {
            content: {
                Id: updatedInventory._id,
                Quantity: updatedInventory.quantity,
                WarningQuantity: updatedInventory.warningQuantity,
                Product: {
                    Id: product._id,
                    BasePrice: product.basePrice,
                    Description: product.description,
                    SellingPrice: product.sellingPrice,
                    CreatedAt: product.createdAt,
                    UpdatedAt: product.updatedAt
                },
                CreatedAt: updatedInventory.createdAt,
                UpdatedAt: updatedInventory.updatedAt
            },
            message:
                type === 'ADD'
                    ? 'Successfully added stock.'
                    : type === 'SUBTRACT'
                        ? 'Successfully subtracted stock.'
                        : ''
        };

        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};
