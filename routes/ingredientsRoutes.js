// routes/ingredientsRoutes.js

const express = require('express');
const router = express.Router();
const { getAllIngredients, addIngredient,getIngredientById,deleteIngredientById, updateIngredientById } = require('../controllers/ingredientsController');

// Endpoint untuk menampilkan daftar semua bahan ramuan
router.get('/api/ingredients', getAllIngredients);
// Endpoint untuk menambahkan bahan ramuan baru
router.post('/api/ingredients/add', addIngredient);
// Endpoint untuk mendapatkan detail bahan ramuan berdasarkan ID bahan
router.get('/api/ingredients/:ingredientId', getIngredientById);
// Endpoint untuk menghapus bahan ramuan berdasarkan ID bahan
router.delete('/api/ingredients/:ingredientId/delete', deleteIngredientById);
// Endpoint untuk memperbarui detail bahan ramuan berdasarkan ID bahan
router.put('/api/ingredients/:ingredientId/edit', updateIngredientById);

module.exports = router;