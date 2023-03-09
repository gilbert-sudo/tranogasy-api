const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageControllers');

// GET all images
router.get('/', imageController.getAllImages);

// POST new image
router.post('/', imageController.createImage);

// GET image by ID
router.get('/:id', imageController.getImageById);

// UPDATE image by ID
router.put('/:id', imageController.updateImageById);

// DELETE image by ID
router.delete('/:id', imageController.deleteImageById);

module.exports = router;
