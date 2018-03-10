const mongoose = require('mongoose');

const Inventory = require('../models/inventory');
const Transaction = require('../models/transaction');

exports.addStock = async (req, res, next) => {
    let { inventoryId } = req.params;
    let { quantityToAdd } = req.body;

    try {
        let inventory = await Inventory.findByIdAndUpdate(inventoryId, {
            $inc: { quantity: quantityToAdd }
        }).exec();
    
        let updatedInventory = await Inventory.findById(inventoryId)
            .select('_id quantity product warningQuantity')
            .populate('product')
            .exec();

        let transaction = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            originalQuantity: inventory.quantity,
            quantity: quantityToAdd,
            newQuantity: updatedInventory.quantity,
            totalPrice: updatedInventory.product.basePrice * quantityToAdd,
            transactionType: 'ADD',
            product: updatedInventory.product._id
        });

        await transaction.save();

        const response = {
            content: updatedInventory,
            message: 'Successfully added stock.'
        };
    
        res.json(response);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};
