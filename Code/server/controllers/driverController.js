const Driver = require('../models/DriverSchema');
const MyBooking = require('../models/MyBookingSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let driver = await Driver.findOne({ email });
    if (driver) return res.status(400).json({ error: 'Driver already exists' });
    
    driver = new Driver({ name, email, password });
    await driver.save();
    res.status(201).json({ message: 'Driver registered successfully. Pending Admin approval.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findOne({ email });
    if (!driver) return res.status(400).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    if (!driver.isApproved) return res.status(403).json({ error: 'Account pending admin approval' });

    const token = jwt.sign({ id: driver._id, role: 'driver' }, process.env.JWT_SECRET || 'ucab_secret', { expiresIn: '1d' });
    res.json({ token, driver: { id: driver._id, name: driver.name, email: driver.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAssignedRides = async (req, res) => {
  try {
    // Assuming driver id is available via auth middleware
    const driverId = req.user.id;
    const rides = await MyBooking.find({
      $or: [
        { driverId },
        { status: 'Pending' }
      ]
    })
      .populate('userId', 'name phone')
      .populate('carId', 'name type plateNumber');
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRideStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    let updateData = { status };
    if (status === 'Accepted') {
      updateData.driverId = req.user.id; // Lock the ride to this driver
    }
    
    const booking = await MyBooking.findByIdAndUpdate(id, updateData, { new: true });
    
    if (status === 'Completed' && booking) {
      await Driver.findByIdAndUpdate(booking.driverId, { $inc: { totalEarnings: booking.totalAmount } });
    }
    
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, getAssignedRides, updateRideStatus };
