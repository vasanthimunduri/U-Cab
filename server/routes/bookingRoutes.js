const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, getAllBookings } = require('../controllers/bookingController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

router.post('/book', verifyToken, createBooking);
router.get('/mybookings', verifyToken, getUserBookings);
router.get('/all', verifyAdmin, getAllBookings);

module.exports = router;
