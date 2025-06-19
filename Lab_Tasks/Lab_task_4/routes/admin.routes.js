const express = require('express');
const router = express.Router();

const { ensureAdmin } = require('../middleware/admin.middleware');

const productController = require('../controllers/product.controller');
const orderController = require('../controllers/order.controller');

router.use(ensureAdmin);

router.get('/', (req, res) => {
    res.render('admin/dashboard', { title: 'Admin Dashboard' }); 
});

router.get('/products/add', productController.getAddProductPage);

router.post('/products/add', productController.createProduct);


router.get('/products', productController.listProducts);


router.get('/products/edit/:id', productController.getEditProductPage);

router.post('/products/edit/:id', productController.updateProduct);

router.post('/products/delete/:id', productController.deleteProduct);
router.get('/orders', orderController.getAllOrders);

module.exports = router; 
