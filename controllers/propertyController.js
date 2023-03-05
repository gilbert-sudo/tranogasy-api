const Property = require('../models/property');
const City = require('../models/city');
const Feature = require('../models/feature');
const Image = require('../models/image');

// Get all properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('city').populate('features').populate('images');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single property
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('city').populate('features').populate('images');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new property
const createProperty = async (req, res) => {
  const property = new Property({
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    price: req.body.price,
    rent: req.body.rent,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    area: req.body.area
  });

  try {
    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a property
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Update the fields
    property.title = req.body.title;
    property.description = req.body.description;
    property.address = req.body.address;
    property.city = req.body.city;
    property.price = req.body.price;
    property.bedrooms = req.body.bedrooms;
    property.bathrooms = req.body.bathrooms;
    property.area = req.body.area;

    // Save the updated property
    const savedProperty = await property.save();
    res.json(savedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    await property.remove();
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty
};
