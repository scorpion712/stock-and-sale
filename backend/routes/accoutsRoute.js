const express = require('express');
const accountCtrl = require('../controllers/accountsController');

const router = express.Router();

router.get('/accounts', accountCtrl.fetchAccounts);
router.put('/accounts', accountCtrl.payOffAccount);

module.exports = router;
