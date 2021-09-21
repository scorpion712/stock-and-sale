const express = require('express');
const providerCtrl = require('../controllers/providersController');

const router = express.Router();

// Defining API for providers and controller
router.get('/providers', providerCtrl.fetchProviders);
router.post('/providers', providerCtrl.createProvider);
router.post('/providers/increase/:id', providerCtrl.increaseProvider);
router.put('/providers/:id', providerCtrl.editProvider);
router.delete('/providers/:id', providerCtrl.removeProvider);

module.exports = router;