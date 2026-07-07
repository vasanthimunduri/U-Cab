const mongoose = require("mongoose");

const MyBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  dropDate: { type: Date, required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  status: { type: String, enum: ["Pending", "Accepted", "Rejected", "Started", "Completed", "Cancelled"], default: "Pending" },
  totalAmount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("MyBooking", MyBookingSchema);
