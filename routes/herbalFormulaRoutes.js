// routes/herbalFormulasRoutes.js

const express = require('express');
const router = express.Router();
const { addHerbalFormula, getAllHerbalFormulas, getHerbalFormulaById,deleteHerbalFormula, addIngredientToFormula,updateHerbalFormula,getIngredientsInFormula,deleteIngredientFromFormula,updateIngredientInFormula,getHerbalFormulasByIngredient,getHerbalFormulaStock,addHerbalFormulaStock,updateHerbalFormulaStock,deleteHerbalFormulaStock} = require('../controllers/herbalFormulaController');

// Endpoint untuk menambahkan ramuan obat baru
router.post('/api/herbal-formulas/add', addHerbalFormula);
// Endpoint untuk mendapatkan daftar semua ramuan obat
router.get('/api/herbal-formulas', getAllHerbalFormulas);
// Endpoint untuk mendapatkan detail ramuan obat berdasarkan ID
router.get('/api/herbal-formulas/:formulaId/detail', getHerbalFormulaById);
// Endpoint untuk menghapus ramuan obat
router.delete('/api/herbal-formulas/:formulaId/delete', deleteHerbalFormula);
// Endpoint untuk mengupdate informasi ramuan obat
router.put('/api/herbal-formulas/:formulaId/edit', updateHerbalFormula);
// Endpoint untuk menambahkan bahan ramuan ke dalam suatu formula ramuan obat
router.post('/api/herbal-formulas/:formulaId/ingredients/:ingredient_id/add', addIngredientToFormula);
// Endpoint untuk mendapatkan bahan-bahan dalam suatu formula ramuan
router.get('/api/herbal-formulas/:formulaId/ingredients', getIngredientsInFormula);
// Endpoint untuk menghapus bahan ramuan dari suatu formula ramuan obat
router.delete('/api/herbal-formulas/:formulaId/ingredients/:ingredientId', deleteIngredientFromFormula);
// Endpoint untuk memperbarui detail bahan dalam suatu formula ramuan
router.put('/api/herbal-formulas/:formulaId/ingredients/:ingredientId', updateIngredientInFormula);
// Endpoint untuk menampilkan daftar ramuan obat yang mengandung bahan ramuan tertentu
router.get('/api/ingredients/:ingredientId/herbal-formulas', getHerbalFormulasByIngredient);
// Endpoint untuk menghitung jumlah stok ramuan obat dalam suatu toko atau apotek berdasarkan ID ramuan
router.get('/api/herbal-formulas/:formulaId/stock', getHerbalFormulaStock);
// Endpoint untuk menambahkan stok ramuan obat ke dalam suatu toko atau apotek berdasarkan ID ramuan
router.post('/api/herbal-formulas/:formulaId/stock', addHerbalFormulaStock);
// Endpoint untuk memperbarui jumlah stok ramuan obat dalam suatu toko atau apotek berdasarkan ID ramuan
router.put('/api/herbal-formulas/:formulaId/stock', updateHerbalFormulaStock);
// Endpoint untuk menghapus stok ramuan obat dari suatu toko atau apotek berdasarkan ID ramuan
router.delete('/api/herbal-formulas/:formulaId/stock', deleteHerbalFormulaStock);

module.exports = router;