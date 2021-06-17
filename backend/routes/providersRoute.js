const express = require('express');
const providerCtrl = require('../controllers/providersController');

const router = express.Router();

// Defining API for providers and controller
router.get('/provider', providerCtrl.fetchProviders);
router.post('/provider', providerCtrl.createProvider);
router.post('/provider/increase/:id', providerCtrl.increaseProvider);
router.put('/provider/:id', providerCtrl.editProvider);
router.delete('/provider/:id', providerCtrl.removeProvider);

module.exports = router;