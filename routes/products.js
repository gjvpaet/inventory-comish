const express = require('express');

const router = express.Router();

const ProductController = require('../controllers/products');

router.get('/', ProductController.getAll);
router.post('/', ProductController.createProduct);
router.put('/:productId', ProductController.updateProduct);

module.exports = router;