const express = require('express');
const cashCtrl = require('../controllers/cashController');

const router = express.Router();

// Defining API for cash and controller
router.get('/cash', cashCtrl.getCash);

module.exports = router;