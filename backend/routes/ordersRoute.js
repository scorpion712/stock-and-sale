const express = require('express');
const orderCtrl = require('../controllers/ordersController');

const router = express.Router();

router.get('/orders', orderCtrl.fetchSales);
router.post('/orders', orderCtrl.createOrder);
router.get('/orders/:id', orderCtrl.getSaleDetail);

module.exports = router;
