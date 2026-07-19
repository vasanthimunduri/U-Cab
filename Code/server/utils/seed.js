// Run with: node utils/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Cab = require("../models/Cab");

const sampleCabs = [
  {
    driverName: "Ramesh Kumar",
    plateNumber: "TS09AB1234",
    type: "mini",
    ratePerKm: 12,
    baseFare: 35,
    capacity: 4,
    rating: 4.6,
    currentLocation: { lat: 17.4239, lng: 78.4738 },
  },
  {
    driverName: "Priya Singh",
    plateNumber: "TS09CD5678",
    type: "sedan",
    ratePerKm: 15,
    baseFare: 50,
    capacity: 4,
    rating: 4.8,
    currentLocation: { lat: 17.4065, lng: 78.4772 },
  },
  {
    driverName: "Arjun Reddy",
    plateNumber: "TS09EF9012",
    type: "suv",
    ratePerKm: 20,
    baseFare: 70,
    capacity: 6,
    rating: 4.7,
    currentLocation: { lat: 17.3966, lng: 78.4903 },
  },
  {
    driverName: "Karthik Rao",
    plateNumber: "TS09GH3456",
    type: "auto",
    ratePerKm: 9,
    baseFare: 25,
    capacity: 3,
    rating: 4.3,
    currentLocation: { lat: 17.4326, lng: 78.4071 },
  },
  {
    driverName: "Sneha Patil",
    plateNumber: "TS09IJ7890",
    type: "bike",
    ratePerKm: 6,
    baseFare: 15,
    capacity: 1,
    rating: 4.5,
    currentLocation: { lat: 17.4483, lng: 78.3915 },
  },
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Cab.deleteMany({});
  await Cab.insertMany(sampleCabs);
  console.log(`Seeded ${sampleCabs.length} cabs.`);
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
