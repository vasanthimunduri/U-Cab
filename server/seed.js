const mongoose = require('mongoose');
const Car = require('./models/CarSchema');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Car.deleteMany({});
  await Car.create([
    { name: 'Swift Dzire', model: '2023', type: 'Sedan', ratePerKm: 15, plateNumber: 'AP 09 CD 1234', driverName: 'Ramesh' },
    { name: 'Innova Crysta', model: '2022', type: 'SUV', ratePerKm: 20, plateNumber: 'TS 08 AB 9876', driverName: 'Suresh' },
    { name: 'Maruti Alto', model: '2021', type: 'Mini', ratePerKm: 10, plateNumber: 'MH 01 XY 5678', driverName: 'Mahesh' }
  ]);
  console.log('Seeded cabs successfully!');
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
