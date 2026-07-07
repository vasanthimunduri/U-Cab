const Admin = require('../models/AdminSchema');
const User = require('../models/UserSchema');
const Driver = require('../models/DriverSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ error: 'Admin already exists' });
    
    admin = new Admin({ name, email, password });
    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET || 'ucab_secret', { expiresIn: '1d' });
    res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().select('-password').populate('carId');
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const approveDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;
    const driver = await Driver.findByIdAndUpdate(id, { isApproved }, { new: true });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, getUsers, getDrivers, approveDriver };
