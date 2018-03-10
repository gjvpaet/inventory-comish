const mongoose = require('mongoose');

const Transaction = require('../models/transaction');

exports.getAllTransactions = async (req, res, next) => {
    try {
        let transactions = await Transaction.find()
            .select(
                '_id quantity originalQuantity newQuantity totalPrice product transactionType'
            )
            .populate('product')
            .exec();

        const response = {
            list: transactions,
            count: transactions.length,
            message: 'Successfully fetched transactions.'
        };

        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};
