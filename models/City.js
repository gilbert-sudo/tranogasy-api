// City model
const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  quarter: { type: String, required: true },
  commune: { type: String, required: true },
  cityname: { type: String, required: true },
});

module.exports = mongoose.model("City", citySchema);
