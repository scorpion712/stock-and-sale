const express = require('express');
const productCtrl = require('../controllers/productsController');

const router = express.Router();

// Defining API for products and controller
router.get('/products', productCtrl.fetchProducts);
router.post('/products', productCtrl.createProduct);
router.put('/products/:id', productCtrl.editProduct);
router.delete('/products/:id', productCtrl.removeProduct);

module.exports = router;