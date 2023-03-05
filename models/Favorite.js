// Favorite model
const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
