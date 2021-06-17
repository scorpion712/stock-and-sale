const express = require('express');
const clientCtrl = require('../controllers/clientsController');

const router = express.Router();

// Defining API routes for clients and controller
router.post('/clients', clientCtrl.createClient);
router.put('/clients/:id', clientCtrl.editClient);
router.get('/clients', clientCtrl.fetchClients);
router.delete('/clients/:id', clientCtrl.removeClient);

module.exports = router;