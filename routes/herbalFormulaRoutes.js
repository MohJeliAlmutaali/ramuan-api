// routes/herbalFormulasRoutes.js

const express = require('express');
const router = express.Router();
const { addHerbalFormula, getAllHerbalFormulas, getHerbalFormulaById,deleteHerbalFormula,updateHerbalFormula} = require('../controllers/herbalFormulaController');

const { addIngredientToFormula, getIngredientsInFormula, deleteIngredientFromFormula, updateIngredientInFormula, getHerbalFormulasByIngredient } = require('../controllers/formulaIngredientsRelationController')

const {addImageToFormula, getImageDetailById, deleteImageFromFormula, updateImageInFormula} = require('../controllers/formulaImagesController')

const authMiddleware = require('../middlewares/authMiddleware')

// Endpoint untuk menambahkan ramuan obat baru
router.post('/api/herbal-formulas/add', authMiddleware, addHerbalFormula);
// Endpoint untuk mendapatkan daftar semua ramuan obat
router.get('/api/herbal-formulas', authMiddleware, authMiddleware, getAllHerbalFormulas);
// Endpoint untuk mendapatkan detail ramuan obat berdasarkan ID
router.get('/api/herbal-formulas/:formulaId/detail', authMiddleware, getHerbalFormulaById);
// Endpoint untuk menghapus ramuan obat
router.delete('/api/herbal-formulas/:formulaId/delete', authMiddleware, deleteHerbalFormula);
// Endpoint untuk mengupdate informasi ramuan obat
router.put('/api/herbal-formulas/:formulaId/edit', authMiddleware, updateHerbalFormula);
// Endpoint untuk menambahkan bahan ramuan ke dalam suatu formula ramuan obat
router.post('/api/herbal-formulas/:formulaId/ingredients/:ingredient_id/add', authMiddleware, addIngredientToFormula);
// Endpoint untuk mendapatkan bahan-bahan dalam suatu formula ramuan
router.get('/api/herbal-formulas/:formulaId/ingredients', authMiddleware, getIngredientsInFormula);
// Endpoint untuk menghapus bahan ramuan dari suatu formula ramuan obat
router.delete('/api/herbal-formulas/:formulaId/ingredients/:ingredientId/delete', authMiddleware, deleteIngredientFromFormula);
// Endpoint untuk memperbarui detail bahan dalam suatu formula ramuan
router.put('/api/herbal-formulas/:formulaId/ingredients/:ingredientId/edit', authMiddleware, updateIngredientInFormula);
// Endpoint untuk menampilkan daftar ramuan obat yang mengandung bahan ramuan tertentu
router.get('/api/ingredients/:ingredientId/herbal-formulas', authMiddleware, getHerbalFormulasByIngredient);
// Endpoint untuk menambahkan gambar pada ramuan obat
router.post('/api/herbal-formulas/:formulaId/images/add', authMiddleware, addImageToFormula);
// Endpoint untuk mendapatkan detail gambar ramuan obat berdasarkan ID gambar
router.get('/api/herbal-formulas/images/:imageId/detail', authMiddleware, getImageDetailById);
// Endpoint untuk menghapus gambar pada ramuan obat
router.delete('/api/herbal-formulas/images/:imageId/delete', authMiddleware, deleteImageFromFormula);
// Endpoint untuk mengupdate informasi gambar pada ramuan obat
router.put('/api/herbal-formulas/images/:imageId/edit', authMiddleware, updateImageInFormula);


module.exports = router;