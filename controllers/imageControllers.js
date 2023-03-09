const Image = require('../models/image');

const imageController = {};

// GET all images
imageController.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new image
imageController.createImage = async (req, res) => {
  const image = new Image({
    url: req.body.url,
    alt: req.body.alt,
    caption: req.body.caption
  });

  try {
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET image by ID
imageController.getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (image) {
      res.json(image);
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE image by ID
imageController.updateImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (image) {
      image.url = req.body.url || image.url;
      image.alt = req.body.alt || image.alt;
      image.caption = req.body.caption || image.caption;

      const updatedImage = await image.save();
      res.json(updatedImage);
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE image by ID
imageController.deleteImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (image) {
      await image.remove();
      res.json({ message: 'Image deleted' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = imageController;
