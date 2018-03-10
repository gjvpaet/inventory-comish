const express = require('express');

const router = express.Router();

const InventoryController = require('../controllers/inventory');

router.put('/:inventoryId', InventoryController.addStock);

module.exports = router;