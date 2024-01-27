// routes/ingredientsRoutes.js

const express = require('express');
const router = express.Router();
const { getAllIngredients, addIngredient,getIngredientById,deleteIngredientById, updateIngredientById } = require('../controllers/ingredientsController');

const authMiddleware = require('../middlewares/authMiddleware')

// Endpoint untuk menampilkan daftar semua bahan ramuan
router.get('/api/ingredients', authMiddleware, getAllIngredients);
// Endpoint untuk menambahkan bahan ramuan baru
router.post('/api/ingredients/add', authMiddleware, addIngredient);
// Endpoint untuk mendapatkan detail bahan ramuan berdasarkan ID bahan
router.get('/api/ingredients/:ingredientId', authMiddleware, getIngredientById);
// Endpoint untuk menghapus bahan ramuan berdasarkan ID bahan
router.delete('/api/ingredients/:ingredientId/delete', authMiddleware, deleteIngredientById);
// Endpoint untuk memperbarui detail bahan ramuan berdasarkan ID bahan
router.put('/api/ingredients/:ingredientId/edit', authMiddleware, updateIngredientById);

module.exports = router;