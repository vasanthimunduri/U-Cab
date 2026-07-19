const Car = require('../models/CarSchema');

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addCar = async (req, res) => {
  try {
    const { name, model, type, ratePerKm, plateNumber, driverName } = req.body;
    let image = '';
    if (req.file) {
      image = req.file.filename;
    }
    
    const car = new Car({ name, model, type, ratePerKm, plateNumber, driverName, image });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const car = await Car.findByIdAndUpdate(id, updateData, { new: true });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    await Car.findByIdAndDelete(id);
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCars, addCar, editCar, deleteCar };
