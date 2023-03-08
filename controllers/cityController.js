const City = require('../models/City');

const cityController = {};

// Create a new city
cityController.createCity = async (req, res) => {
  try {
    const { quarter, commune, cityname } = req.body;
    const newCity = new City({ quarter, commune, cityname });
    await newCity.save();
    res.status(201).json({ message: 'City created successfully', city: newCity });
  } catch (error) {
    res.status(500).json({ message: 'Error creating city', error });
  }
};

// Retrieve all cities
cityController.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json({ cities });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cities', error });
  }
};

// Retrieve a single city by ID
cityController.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.status(200).json({ city });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving city', error });
  }
};

// Update a city by ID
cityController.updateCityById = async (req, res) => {
  try {
    const { quarter, commune, cityname } = req.body;
    const updatedCity = await City.findByIdAndUpdate(req.params.id, { quarter, commune, cityname }, { new: true });
    if (!updatedCity) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.status(200).json({ message: 'City updated successfully', city: updatedCity });
  } catch (error) {
    res.status(500).json({ message: 'Error updating city', error });
  }
};

// Delete a city by ID
cityController.deleteCityById = async (req, res) => {
  try {
    const deletedCity = await City.findByIdAndDelete(req.params.id);
    if (!deletedCity) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.status(200).json({ message: 'City deleted successfully', city: deletedCity });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting city', error });
  }
};

module.exports = cityController;
