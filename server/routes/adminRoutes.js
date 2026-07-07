const express = require('express');
const router = express.Router();
const { register, login, getUsers, getDrivers, approveDriver } = require('../controllers/adminController');
const { verifyAdmin } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/users', verifyAdmin, getUsers);
router.get('/drivers', verifyAdmin, getDrivers);
router.put('/drivers/:id/approve', verifyAdmin, approveDriver);

module.exports = router;
