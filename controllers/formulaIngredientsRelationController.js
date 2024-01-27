// controllers/formulaIngredientsRelationController.js
const FormulaIngredientsRelation = require('../models/FormulaIngredientsRelation');

// Controller untuk menambahkan bahan ramuan ke dalam suatu formula ramuan obat
const addIngredientToFormula = (req, res) => {
    const formulaId = req.params.formulaId;
    const ingredientId = req.params.ingredient_id;
    const { quantity } = req.body;

    // Pastikan semua data yang diperlukan ada
    if (!ingredientId || !quantity) {
        return res.status(400).json({ message: 'Semua bidang harus diisi' });
    }

    FormulaIngredientsRelation.addIngredientToFormula(formulaId, ingredientId, quantity, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan bahan ramuan ke dalam formula' });
        }
        return res.status(201).json({ message: 'Bahan ramuan berhasil ditambahkan ke dalam formula' });
    });
};

// Controller untuk mendapatkan bahan-bahan dalam suatu formula ramuan
const getIngredientsInFormula = (req, res) => {
    const formulaId = req.params.formulaId;

    FormulaIngredientsRelation.getIngredientsInFormula(formulaId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat mendapatkan bahan-bahan dalam formula' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Tidak ada bahan yang ditemukan dalam formula' });
        }
        return res.status(200).json({ ingredients: result });
    });
};

// Controller untuk menghapus bahan ramuan dari suatu formula ramuan obat
const deleteIngredientFromFormula = (req, res) => {
    const formulaId = req.params.formulaId;
    const ingredientId = req.params.ingredientId;

    FormulaIngredientsRelation.deleteIngredientFromFormula(formulaId, ingredientId, (err, deleted) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus bahan dari formula' });
        }
        if (!deleted) {
            return res.status(404).json({ message: 'Bahan tidak ditemukan dalam formula' });
        }
        return res.status(200).json({ message: 'Bahan berhasil dihapus dari formula' });
    });
};

// Controller untuk memperbarui detail bahan dalam suatu formula ramuan
const updateIngredientInFormula = (req, res) => {
    const formulaId = req.params.formulaId;
    const ingredientId = req.params.ingredientId;
    const { quantity } = req.body;

    // Pastikan quantity yang dikirim valid
    if (!quantity || isNaN(quantity)) {
        return res.status(400).json({ message: 'Quantity harus berupa angka' });
    }

    FormulaIngredientsRelation.updateIngredientInFormula(formulaId, ingredientId, quantity, (err, updated) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui bahan dalam formula' });
        }
        if (!updated) {
            return res.status(404).json({ message: 'Bahan tidak ditemukan dalam formula' });
        }
        return res.status(200).json({ message: 'Detail bahan dalam formula berhasil diperbarui' });
    });
};

// Controller untuk mendapatkan daftar ramuan obat yang mengandung bahan ramuan tertentu
const getHerbalFormulasByIngredient = (req, res) => {
    const ingredientId = req.params.ingredientId;

    FormulaIngredientsRelation.getHerbalFormulasByIngredient(ingredientId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil daftar ramuan obat' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Tidak ada ramuan obat yang mengandung bahan ramuan tersebut' });
        }
        return res.status(200).json({ herbalFormulas: result });
    });
};




module.exports = { addIngredientToFormula, getIngredientsInFormula, deleteIngredientFromFormula, updateIngredientInFormula, getHerbalFormulasByIngredient };
