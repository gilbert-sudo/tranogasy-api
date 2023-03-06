// Image model
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String, required: true },
  caption: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);

