const Property = require("../models/property");
const City = require("../models/city");
const Feature = require("../models/feature");
const Image = require("../models/image");
const Counter = require("../models/Counter");

// Get all properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("city")
      .populate("features")
      .populate("images");
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single property
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("city")
      .populate("features")
      .populate("images");
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
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
    area: req.body.area,
    propertyNumber: 0
  });

  try {
    const savedProperty = await property.save();
    console.log(savedProperty._id);
    var lastValue;

    const lastCounter = await Counter.find().sort({ _id: -1 }).limit(1);
    if (!lastCounter?.length) {
       lastValue = 499;
    } else {
       lastValue = lastCounter[0].propertyNumber + 1;
    }
    try {
      const counter = new Counter({
        propertyId: savedProperty._id,
        propertyNumber: lastValue,
      });
      const saveCounter = await counter.save();

      const newProperty = await Property.findById(savedProperty._id);
      if (!newProperty) {
        return res.status(404).json({ message: "Property not found" });
      }

      // Update the fields
      newProperty.title = savedProperty.title;
      newProperty.description = savedProperty.description;
      newProperty.address = savedProperty.address;
      newProperty.city = savedProperty.city;
      newProperty.price = savedProperty.price;
      newProperty.bedrooms = savedProperty.bedrooms;
      newProperty.bathrooms = savedProperty.bathrooms;
      newProperty.area = savedProperty.area;
      newProperty.propertyNumber = lastValue;

      // Save the updated newProperty
      const savedProperty2 = await newProperty.save();
      res.json(savedProperty2);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a property
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
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
      return res.status(404).json({ message: "Property not found" });
    }
    await property.remove();
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
};
