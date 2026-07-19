const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Car = require('./models/CarSchema');
require('dotenv').config();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const images = [
  { source: "C:\\Users\\venka\\.gemini\\antigravity-ide\\brain\\806bc7db-3791-4942-8e2a-343215c98035\\sedan_car_1783356019869.png", target: "sedan.png", type: "Sedan" },
  { source: "C:\\Users\\venka\\.gemini\\antigravity-ide\\brain\\806bc7db-3791-4942-8e2a-343215c98035\\suv_car_1783356030290.png", target: "suv.png", type: "SUV" },
  { source: "C:\\Users\\venka\\.gemini\\antigravity-ide\\brain\\806bc7db-3791-4942-8e2a-343215c98035\\mini_car_1783356039744.png", target: "mini.png", type: "Mini" }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  for (let img of images) {
    if (fs.existsSync(img.source)) {
      fs.copyFileSync(img.source, path.join(uploadsDir, img.target));
      await Car.updateMany({ type: img.type }, { image: img.target });
    }
  }
  console.log('Images attached and DB updated!');
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
