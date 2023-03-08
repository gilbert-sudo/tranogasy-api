const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

// Create a new city
router.post('/', cityController.createCity);

// Retrieve all cities
router.get('/', cityController.getAllCities);

// Retrieve a single city by ID
router.get('/:id', cityController.getCityById);

// Update a city by ID
router.put('/:id', cityController.updateCityById);

// Delete a city by ID
router.delete('/:id', cityController.deleteCityById);

module.exports = router;
