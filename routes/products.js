const express = require('express');

const router = express.Router();

const ProductController = require('../controllers/products');

router.get('/', ProductController.getAll);
router.post('/', ProductController.createProduct);
router.get('/:productId', ProductController.getProduct);
router.put('/:productId', ProductController.updateProduct);
router.delete('/:productId', ProductController.deleteProduct);

module.exports = router;