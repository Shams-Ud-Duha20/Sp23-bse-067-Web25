const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller'); 
const { ensureAuthenticated } = require('../middleware/auth.middleware'); 

router.get('/', ensureAuthenticated, orderController.getMyOrders);

router.post('/place-cash-order', ensureAuthenticated, orderController.placeCashOrder);

module.exports = router; 
