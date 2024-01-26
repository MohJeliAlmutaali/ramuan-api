// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

// Login user
router.post('/login', userController.loginUser);
// Mendefinisikan rute untuk mendapatkan informasi profil pengguna
router.get('/profile', verifyToken, userController.getUserProfile);

module.exports = router;