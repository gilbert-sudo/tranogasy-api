// Property model
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
  features: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feature' }],
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

propertySchema.plugin(AutoIncrement, {inc_field: 'propertyId', start_seq: 500});

module.exports = mongoose.model('Property', propertySchema); 