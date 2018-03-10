const mongoose = require('mongoose');

const Inventory = require('../models/inventory');
const Transaction = require('../models/transaction');

exports.modifyStock = async (req, res, next) => {
    let { inventoryId } = req.params;
    let { qty, type } = req.body;

    try {
        let inventory = await Inventory.findByIdAndUpdate(inventoryId, {
            $inc: {
                quantity: type === 'ADD' ? qty : type === 'SUBTRACT' ? -qty : 0
            }
        }).exec();

        let updatedInventory = await Inventory.findById(inventoryId)
            .select('_id quantity product warningQuantity')
            .populate('product')
            .exec();

        let transaction = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            originalQuantity: inventory.quantity,
            quantity: qty,
            newQuantity: updatedInventory.quantity,
            totalPrice:
                type === 'ADD'
                    ? updatedInventory.product.basePrice * qty
                    : type === 'SUBTRACT'
                        ? updatedInventory.product.sellingPrice * qty
                        : null,
            transactionType: type,
            product: updatedInventory.product._id
        });

        await transaction.save();

        const response = {
            content: updatedInventory,
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
