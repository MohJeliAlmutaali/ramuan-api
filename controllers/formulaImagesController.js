// controllers/formulaImagesController.js
const FormulaImages = require('../models/FormulaImages');

// Controller untuk menambahkan gambar pada ramuan obat
const addImageToFormula = (req, res) => {
    const formulaId = req.params.formulaId;
    const { imageUrl, caption } = req.body;

    // Pastikan semua data yang diperlukan ada
    if (!imageUrl || !caption) {
        return res.status(400).json({ message: 'Semua bidang harus diisi' });
    }

    FormulaImages.addImageToFormula(formulaId, imageUrl, caption, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan gambar pada ramuan obat' });
        }
        return res.status(201).json({ message: 'Gambar pada ramuan obat berhasil ditambahkan' });
    });
};

// Controller untuk mendapatkan detail gambar ramuan obat berdasarkan ID gambar
const getImageDetailById = (req, res) => {
    const imageId = req.params.imageId;

    FormulaImages.getImageDetailById(imageId, (err, imageData) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil detail gambar' });
        }
        if (!imageData) {
            return res.status(404).json({ message: 'Gambar tidak ditemukan' });
        }
        return res.status(200).json(imageData);
    });
};

// Controller untuk menghapus gambar pada ramuan obat
const deleteImageFromFormula = (req, res) => {
    const imageId = req.params.imageId;

    FormulaImages.deleteImageFromFormula(imageId, (err, deleted) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus gambar pada ramuan obat' });
        }
        if (!deleted) {
            return res.status(404).json({ message: 'Gambar tidak ditemukan' });
        }
        return res.status(200).json({ message: 'Gambar pada ramuan obat berhasil dihapus' });
    });
};

// Controller untuk mengupdate informasi gambar pada ramuan obat
const updateImageInFormula = (req, res) => {
    const imageId = req.params.imageId;
    const { imageUrl, caption } = req.body;

    // Pastikan semua data yang diperlukan ada
    if (!imageUrl || !caption) {
        return res.status(400).json({ message: 'Semua bidang harus diisi' });
    }

    FormulaImages.updateImageInFormula(imageId, imageUrl, caption, (err, updated) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate informasi gambar pada ramuan obat' });
        }
        if (!updated) {
            return res.status(404).json({ message: 'Gambar tidak ditemukan' });
        }
        return res.status(200).json({ message: 'Informasi gambar pada ramuan obat berhasil diupdate' });
    });
};


module.exports = { addImageToFormula, getImageDetailById, deleteImageFromFormula, updateImageInFormula };
