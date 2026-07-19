const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, required: true }, // e.g. Hatchback, Sedan, SUV, Bike
  ratePerKm: { type: Number, required: true },
  image: { type: String }, // Path to uploaded image
  plateNumber: { type: String, required: true, unique: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Car", CarSchema);
