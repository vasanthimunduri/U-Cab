const MyBooking = require('../models/MyBookingSchema');
const Car = require('../models/CarSchema');

const createBooking = async (req, res) => {
  try {
    const { carId, pickupLocation, dropLocation, pickupDate, dropDate, totalAmount } = req.body;
    const userId = req.user.id;
    
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ error: 'Car not found' });

    const booking = new MyBooking({
      userId, carId, driverId: car.driverId, pickupLocation, dropLocation, pickupDate, dropDate, totalAmount
    });
    
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await MyBooking.find({ userId: req.user.id }).populate('carId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await MyBooking.find().populate('userId', 'name email').populate('carId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createBooking, getUserBookings, getAllBookings };
