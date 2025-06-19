
const express = require('express');
const router = express.Router();

const { ensureAdmin } = require('../middleware/admin.middleware');
const productController = require('../controllers/product.controller');
const orderController = require('../controllers/order.controller');
const vehicleController = require('../controllers/vehicle.controller');

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

router.get('/vehicles/add', vehicleController.getAddVehiclePage);
router.post('/vehicles/add', vehicleController.upload, vehicleController.createVehicle);

router.get('/vehicles', vehicleController.listVehicles);

router.get('/vehicles/edit/:id', vehicleController.getEditVehiclePage);
router.post('/vehicles/edit/:id', vehicleController.upload, vehicleController.updateVehicle);

router.post('/vehicles/delete/:id', vehicleController.deleteVehicle);

module.exports = router;
