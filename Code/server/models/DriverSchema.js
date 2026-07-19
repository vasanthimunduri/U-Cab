const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isApproved: { type: Boolean, default: false }, // Admin must approve before they can drive
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", default: null }, // Assigned car
  totalEarnings: { type: Number, default: 0 }
}, { timestamps: true });

// Hash password before saving
DriverSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Driver", DriverSchema);
