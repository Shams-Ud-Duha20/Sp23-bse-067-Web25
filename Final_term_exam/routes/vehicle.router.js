
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller'); 

router.get('/', vehicleController.listVehiclesPublic);

module.exports = router;
