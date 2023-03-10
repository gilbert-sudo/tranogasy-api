const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  price: { type: Number, required: true },
  rent: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  propertyNumber: { type: Number, required: true },
  features: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feature' }],
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  type: { type: String, enum: ['sale', 'rent'], required: true },
  status: { type: String, enum: ['available', 'unavailable'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
