const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller'); 
const { ensureAuthenticated } = require('../middleware/auth.middleware'); 

router.post('/add', cartController.addToCart);

router.get('/', cartController.viewCart);

router.post('/update', cartController.updateCartItem);

router.post('/remove', cartController.removeCartItem);

router.get('/checkout', ensureAuthenticated, cartController.proceedToCheckout);

module.exports = router;
