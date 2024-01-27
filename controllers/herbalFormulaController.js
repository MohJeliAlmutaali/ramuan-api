// controllers/herbalFormulaController.js
const db = require('../config/database');
const HerbalFormula = require('../models/HerbalFormula');

// Controller untuk menambahkan ramuan obat baru
const addHerbalFormula = (req, res) => {
    const { name, description, usage_instructions } = req.body;

    // Pastikan semua data yang diperlukan ada
    if (!name || !description || !usage_instructions) {
        return res.status(400).json({ message: 'Semua bidang harus diisi' });
    }

    HerbalFormula.addHerbalFormula(name, description, usage_instructions, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan ramuan obat' });
        }
        return res.status(201).json({ message: 'Ramuan obat berhasil ditambahkan' });
    });
};

// Controller untuk mendapatkan semua ramuan obat baru
const getAllHerbalFormulas = (req, res) => {
    HerbalFormula.getAllHerbalFormulas((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data ramuan obat' });
        }
        return res.status(200).json({ herbalFormulas: results });
    });
};

// Controller untuk mendapatkan detail ramuan obat berdasarkan ID
const getHerbalFormulaById = (req, res) => {
    const formulaId = req.params.formulaId;

    HerbalFormula.getHerbalFormulaById(formulaId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil detail ramuan obat' });
        }
        if (!result) {
            return res.status(404).json({ message: 'Ramuan obat tidak ditemukan' });
        }
        return res.status(200).json({ herbalFormula: result });
    });
};

// Controller untuk menghapus ramuan obat
const deleteHerbalFormula = (req, res) => {
    const formulaId = req.params.formulaId;

    HerbalFormula.deleteHerbalFormula(formulaId, (err, deleted) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus ramuan obat' });
        }
        if (!deleted) {
            return res.status(404).json({ message: 'Ramuan obat tidak ditemukan' });
        }
        return res.status(200).json({ message: 'Ramuan obat berhasil dihapus' });
    });
};

// Controller untuk mengupdate informasi ramuan obat
const updateHerbalFormula = (req, res) => {
    const formulaId = req.params.formulaId;
    const { name, description, usage_instructions } = req.body;

    // Pastikan semua data yang diperlukan ada
    if (!name || !description || !usage_instructions) {
        return res.status(400).json({ message: 'Semua bidang harus diisi' });
    }

    HerbalFormula.updateHerbalFormula(formulaId, name, description, usage_instructions, (err, updated) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui informasi ramuan obat' });
        }
        if (!updated) {
            return res.status(404).json({ message: 'Ramuan obat tidak ditemukan' });
        }
        return res.status(200).json({ message: 'Informasi ramuan obat berhasil diperbarui' });
    });
};

module.exports = { addHerbalFormula, getAllHerbalFormulas, getHerbalFormulaById,deleteHerbalFormula,updateHerbalFormula };