const express = require('express');
const router = express.Router();
const { getCars, addCar, editCar, deleteCar } = require('../controllers/carController');
const { verifyAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

router.get('/', getCars);
router.post('/add', verifyAdmin, upload.single('image'), addCar);
router.put('/edit/:id', verifyAdmin, upload.single('image'), editCar);
router.delete('/delete/:id', verifyAdmin, deleteCar);

module.exports = router;
