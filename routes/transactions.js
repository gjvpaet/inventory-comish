const express = require('express');

const router = express.Router();

const TransactionController = require('../controllers/transactions');

router.get('/', TransactionController.getAllTransactions);

module.exports = router;