const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Get all properties
router.get('/', propertyController.getProperties);

// Get a single property by ID
router.get('/:id', propertyController.getProperty);

// Create a new property
router.post('/', propertyController.createProperty);

// Update an existing property
router.patch('/:id', propertyController.updateProperty);

// Delete a property
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
