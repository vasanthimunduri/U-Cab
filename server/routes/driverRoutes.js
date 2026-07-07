const express = require('express');
const router = express.Router();
const { register, login, getAssignedRides, updateRideStatus } = require('../controllers/driverController');
const { verifyToken, verifyDriver } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/rides', verifyDriver, getAssignedRides);
router.put('/rides/:id/status', verifyDriver, updateRideStatus);

module.exports = router;
