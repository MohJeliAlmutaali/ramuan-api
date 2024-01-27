// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser,loginUser } = require('../controllers/userController');

// Endpoint untuk membuat pengguna baru
router.post('/api/users/register', createUser);
// Endpoint untuk mendapatkan detail pengguna berdasarkan ID
router.get('/api/users/:userId', getUserById);
// Endpoint untuk memperbarui informasi pengguna
router.put('/api/users/:userId/edit', updateUser);
// Endpoint untuk menghapus pengguna
router.delete('/api/users/:userId/delete', deleteUser);
// Endpoint untuk login
router.post('/api/users/login', loginUser);


module.exports = router;
