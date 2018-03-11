const mongoose = require('mongoose');

const Transaction = require('../models/transaction');

exports.getAllTransactions = async (req, res, next) => {
    try {
        let transactions = await Transaction.find()
            .populate('product')
            .exec();
        console.log(transactions);
        const response = {
            list: transactions.map(transaction => {
                return {
                    Id: transaction._id,
                    Quantity: transaction.quantity,
                    OriginalQuantity: transaction.originalQuantity,
                    NewQuantity: transaction.newQuantity,
                    TotalPrice: transaction.totalPrice,
                    TransactionType: transaction.transactionType,
                    Product: {
                        Id: transaction.product._id,
                        BasePrice: transaction.product.basePrice,
                        Description: transaction.product.description,
                        SellingPrice: transaction.product.sellingPrice,
                        CreatedAt: transaction.product.createdAt,
                        UpdatedAt: transaction.product.updatedAt
                    },
                    CreatedAt: transaction.createdAt
                };
            }),
            count: transactions.length,
            message: 'Successfully fetched transactions.'
        };

        res.status(200).json(response);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error });
    }
};
