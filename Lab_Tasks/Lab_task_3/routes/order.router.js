const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { ensureAuthenticated } = require('../middleware/auth.middleware');

router.get('/', ensureAuthenticated, orderController.getMyOrders);

module.exports = router;
