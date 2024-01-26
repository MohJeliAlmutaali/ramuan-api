// controllers/ingredientsController.js

const db = require('../config/database');

// Controller untuk menampilkan daftar semua bahan ramuan
const getAllIngredients = (req, res) => {
    // Query untuk mendapatkan semua bahan ramuan dari database
    const selectQuery = 'SELECT * FROM Ingredients';
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.error('Error getting all ingredients:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil daftar bahan ramuan' });
        }

        // Berhasil mendapatkan daftar bahan ramuan, kembalikan response dengan data
        return res.status(200).json({ ingredients: result });
    });
};

// Controller untuk menambahkan bahan ramuan baru
const addIngredient = (req, res) => {
    const { name, description } = req.body;

    // Pastikan semua data yang diperlukan ada
    if (!name || !description) {
        return res.status(400).json({ message: 'Nama dan deskripsi bahan ramuan harus diisi' });
    }

    // Query untuk menambahkan bahan ramuan baru ke dalam database
    const insertQuery = 'INSERT INTO Ingredients (name, description) VALUES (?, ?)';
    db.query(insertQuery, [name, description], (err, result) => {
        if (err) {
            console.error('Error adding ingredient:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan bahan ramuan' });
        }

        // Berhasil menambahkan bahan ramuan, kembalikan response sukses
        return res.status(201).json({ message: 'Bahan ramuan berhasil ditambahkan' });
    });
};

// Controller untuk mendapatkan detail bahan ramuan berdasarkan ID
const getIngredientById = (req, res) => {
    const ingredientId = req.params.ingredientId;

    // Query untuk mendapatkan detail bahan ramuan dari database
    const query = 'SELECT * FROM Ingredients WHERE ingredient_id = ?';
    db.query(query, [ingredientId], (err, result) => {
        if (err) {
            console.error('Error getting ingredient:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data bahan ramuan' });
        }

        // Jika bahan ramuan tidak ditemukan
        if (result.length === 0) {
            return res.status(404).json({ message: 'Bahan ramuan tidak ditemukan' });
        }

        // Bahan ramuan ditemukan, kirim detailnya sebagai respons
        const ingredient = result[0];
        return res.status(200).json(ingredient);
    });
};

const deleteIngredientById = (req, res) => {
    const ingredientId = req.params.ingredientId;

    // Query untuk menghapus bahan ramuan dari database
    const query = 'DELETE FROM Ingredients WHERE ingredient_id = ?';
    db.query(query, [ingredientId], (err, result) => {
        if (err) {
            console.error('Error deleting ingredient:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus bahan ramuan' });
        }

        // Jika bahan ramuan tidak ditemukan
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Bahan ramuan tidak ditemukan' });
        }

        // Bahan ramuan berhasil dihapus
        return res.status(200).json({ message: 'Bahan ramuan berhasil dihapus' });
    });
};

const updateIngredientById = (req, res) => {
    const ingredientId = req.params.ingredientId;
    const { name, description } = req.body;

    // Pastikan semua data yang diperlukan ada
    if (!name || !description) {
        return res.status(400).json({ message: 'Semua bidang harus diisi' });
    }

    // Query untuk memperbarui detail bahan ramuan
    const query = 'UPDATE Ingredients SET name = ?, description = ? WHERE ingredient_id = ?';
    db.query(query, [name, description, ingredientId], (err, result) => {
        if (err) {
            console.error('Error updating ingredient:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui bahan ramuan' });
        }

        // Jika bahan ramuan tidak ditemukan
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Bahan ramuan tidak ditemukan' });
        }

        // Bahan ramuan berhasil diperbarui
        return res.status(200).json({ message: 'Detail bahan ramuan berhasil diperbarui' });
    });
};


module.exports = { getAllIngredients, addIngredient, getIngredientById, deleteIngredientById, updateIngredientById };