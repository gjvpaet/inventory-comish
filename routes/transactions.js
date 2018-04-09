const express = require('express');

const router = express.Router();

const TransactionController = require('../controllers/transactions');

const checkAuth = require('../middlewares/checkAuth');

router.get('/', checkAuth, TransactionController.getAllTransactions);
router.get('/:startDate/:endDate', TransactionController.getTransactionsByDate);

module.exports = router;