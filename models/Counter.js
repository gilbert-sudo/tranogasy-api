const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  propertyId: { type: String, required: true },
  propertyNumber: { type: Number, default: 0 }
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
