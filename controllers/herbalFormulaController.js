// controllers/herbalFormulaController.js

const db = require('../config/database');

// Controller untuk menambahkan ramuan obat baru
const addHerbalFormula = (req, res) => {
    const { name, description, usage_instructions } = req.body;

    // Pastikan semua data yang diperlukan ada
    if (!name || !description || !usage_instructions) {
        return res.status(400).json({ message: 'Semua bidang harus diisi' });
    }

    // Query untuk menambahkan ramuan obat baru ke dalam database
    const insertQuery = 'INSERT INTO HerbalFormulas (name, description, usage_instructions) VALUES (?, ?, ?)';
    db.query(insertQuery, [name, description, usage_instructions], (err, result) => {
        if (err) {
            console.error('Error adding herbal formula:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan ramuan obat' });
        }

        // Berhasil menambahkan ramuan obat, kembalikan response sukses
        return res.status(201).json({ message: 'Ramuan obat berhasil ditambahkan' });
    });
};

const getAllHerbalFormulas = (req, res) => {
    // Query untuk mendapatkan semua ramuan obat dari database
    const query = 'SELECT * FROM HerbalFormulas';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching herbal formulas:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data ramuan obat' });
        }

        // Berhasil mendapatkan data ramuan obat, kembalikan response dengan data yang ditemukan
        return res.status(200).json({ herbalFormulas: results });
    });
};

// Controller untuk mendapatkan detail ramuan obat berdasarkan ID
const Formula = require('../models/Formula');
const FormulaIngredientsRelation = require('../models/FormulaIngredientsRelation');

const getHerbalFormulaById = async (req, res) => {
    try {
        const formulaId = req.params.formulaId;

        // Query untuk mendapatkan informasi dasar tentang formula
        const formula = await Formula.findByPk(formulaId);

        // Query untuk memeriksa apakah ada penambahan bahan pada formula tertentu
        const ingredientAdditions = await FormulaIngredientsRelation.findAll({
            where: {
                formula_id: formulaId
            }
        });

        // Jika ada penambahan bahan pada formula
        if (ingredientAdditions.length > 0) {
            // Gabungkan informasi tentang penambahan bahan dengan informasi dasar tentang formula
            const formulaDetails = {
                formula,
                ingredientAdditions
            };
            return res.status(200).json(formulaDetails);
        } else {
            // Jika tidak ada penambahan bahan pada formula, kirimkan hanya informasi dasar tentang formula
            return res.status(200).json(formula);
        }
    } catch (error) {
        console.error('Error getting formula details:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil detail formula' });
    }
};

// Controller untuk menghapus ramuan obat
const deleteHerbalFormula = (req, res) => {
    const formulaId = req.params.formulaId;

    // Query untuk menghapus ramuan obat dari database
    const deleteQuery = 'DELETE FROM HerbalFormulas WHERE formula_id = ?';
    db.query(deleteQuery, [formulaId], (err, result) => {
        if (err) {
            console.error('Error deleting herbal formula:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus ramuan obat' });
        }

        // Periksa apakah ramuan obat berhasil dihapus
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ramuan obat tidak ditemukan' });
        }

        // Berhasil menghapus ramuan obat, kembalikan response sukses
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

    // Query untuk mengupdate informasi ramuan obat dalam database
    const updateQuery = 'UPDATE HerbalFormulas SET name = ?, description = ?, usage_instructions = ? WHERE formula_id = ?';
    db.query(updateQuery, [name, description, usage_instructions, formulaId], (err, result) => {
        if (err) {
            console.error('Error updating herbal formula:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui informasi ramuan obat' });
        }

        // Periksa apakah ramuan obat berhasil diupdate
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ramuan obat tidak ditemukan' });
        }

        // Berhasil mengupdate informasi ramuan obat, kembalikan response sukses
        return res.status(200).json({ message: 'Informasi ramuan obat berhasil diperbarui' });
    });
};


// Controller untuk menambahkan bahan ramuan ke dalam suatu formula ramuan obat
const addIngredientToFormula = (req, res) => {
    const formulaId = req.params.formulaId;
    const ingredient_id = req.params.ingredient_id;
    const {quantity } = req.body;

    // Pastikan semua data yang diperlukan ada
    if (!ingredient_id || !quantity) {
        return res.status(400).json({ message: 'Semua bidang harus diisi' });
    }

    // Query untuk menambahkan bahan ramuan ke dalam formula ramuan obat
    const insertQuery = 'INSERT INTO FormulaIngredientsRelation (formula_id, ingredient_id, quantity) VALUES (?, ?, ?)';
    db.query(insertQuery, [formulaId, ingredient_id, quantity], (err, result) => {
        if (err) {
            console.error('Error adding ingredient to formula:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan bahan ramuan ke dalam formula' });
        }

        // Berhasil menambahkan bahan ramuan ke dalam formula, kembalikan response sukses
        return res.status(201).json({ message: 'Bahan ramuan berhasil ditambahkan ke dalam formula' });
    });
};

// Controller untuk mendapatkan bahan-bahan dalam suatu formula ramuan
const getIngredientsInFormula = (req, res) => {
    const formulaId = req.params.formulaId;

    // Query untuk mendapatkan bahan-bahan dalam suatu formula ramuan
    const selectQuery = 'SELECT Ingredients.* FROM Ingredients JOIN FormulaIngredientsRelation ON Ingredients.ingredient_id = FormulaIngredientsRelation.ingredient_id WHERE FormulaIngredientsRelation.formula_id = ?';
    db.query(selectQuery, [formulaId], (err, result) => {
        if (err) {
            console.error('Error getting ingredients in formula:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat mendapatkan bahan-bahan dalam formula' });
        }

        // Pastikan ada bahan yang ditemukan dalam formula
        if (result.length === 0) {
            return res.status(404).json({ message: 'Tidak ada bahan yang ditemukan dalam formula' });
        }

        // Berhasil mendapatkan bahan-bahan dalam formula, kembalikan response dengan data bahan
        return res.status(200).json({ ingredients: result });
    });
};


// Controller untuk menghapus bahan ramuan dari suatu formula ramuan obat
const deleteIngredientFromFormula = (req, res) => {
    const formulaId = req.params.formulaId;
    const ingredientId = req.params.ingredientId;

    // Query untuk menghapus bahan ramuan dari formula ramuan obat
    const deleteQuery = 'DELETE FROM FormulaIngredientsRelation WHERE formula_id = ? AND ingredient_id = ?';
    db.query(deleteQuery, [formulaId, ingredientId], (err, result) => {
        if (err) {
            console.error('Error deleting ingredient from formula:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus bahan dari formula' });
        }

        // Pastikan ada bahan yang dihapus
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Bahan tidak ditemukan dalam formula' });
        }

        // Berhasil menghapus bahan dari formula, kembalikan response sukses
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

    // Query untuk memperbarui quantity bahan dalam formula ramuan
    const updateQuery = 'UPDATE FormulaIngredientsRelation SET quantity = ? WHERE formula_id = ? AND ingredient_id = ?';
    db.query(updateQuery, [quantity, formulaId, ingredientId], (err, result) => {
        if (err) {
            console.error('Error updating ingredient in formula:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui bahan dalam formula' });
        }

        // Pastikan ada bahan yang diperbarui
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Bahan tidak ditemukan dalam formula' });
        }

        // Berhasil memperbarui detail bahan dalam formula, kembalikan response sukses
        return res.status(200).json({ message: 'Detail bahan dalam formula berhasil diperbarui' });
    });
};


// Controller untuk mendapatkan daftar ramuan obat yang mengandung bahan ramuan tertentu
const getHerbalFormulasByIngredient = (req, res) => {
    const ingredientId = req.params.ingredientId;

    // Query untuk mendapatkan daftar ramuan obat yang mengandung bahan ramuan tertentu
    const query = `
        SELECT hf.formula_id, hf.name AS formula_name, hf.description AS formula_description, hf.usage_instructions AS formula_usage_instructions
        FROM HerbalFormulas hf
        JOIN FormulaIngredientsRelation fir ON hf.formula_id = fir.formula_id
        WHERE fir.ingredient_id = ?
    `;
    db.query(query, [ingredientId], (err, result) => {
        if (err) {
            console.error('Error getting herbal formulas by ingredient:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil daftar ramuan obat' });
        }

        // Periksa apakah daftar ramuan obat yang mengandung bahan ramuan tertentu ditemukan
        if (result.length === 0) {
            return res.status(404).json({ message: 'Tidak ada ramuan obat yang mengandung bahan ramuan tersebut' });
        }

        // Berhasil mendapatkan daftar ramuan obat yang mengandung bahan ramuan tertentu, kembalikan response
        return res.status(200).json({ herbalFormulas: result });
    });
};

// Controller untuk menghitung jumlah stok ramuan obat dalam suatu toko atau apotek berdasarkan ID ramuan
const getHerbalFormulaStock = (req, res) => {
    const formulaId = req.params.formulaId;

    // Query untuk menghitung jumlah stok ramuan obat dalam suatu toko atau apotek berdasarkan ID ramuan
    const query = `
        SELECT SUM(quantity) AS total_stock
        FROM FormulaIngredientsRelation
        WHERE formula_id = ?
    `;
    db.query(query, [formulaId], (err, result) => {
        if (err) {
            console.error('Error getting herbal formula stock:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat menghitung jumlah stok ramuan obat' });
        }

        // Periksa apakah jumlah stok ramuan obat ditemukan
        if (result[0].total_stock === null) {
            return res.status(404).json({ message: 'Ramuan obat tidak ditemukan' });
        }

        // Berhasil mendapatkan jumlah stok ramuan obat, kembalikan response
        return res.status(200).json({ total_stock: result[0].total_stock });
    });
};

// Controller untuk menambahkan stok ramuan obat ke dalam suatu toko atau apotek berdasarkan ID ramuan
const addHerbalFormulaStock = (req, res) => {
    const formulaId = req.params.formulaId;
    const { quantity } = req.body;

    // Pastikan quantity yang dikirim tidak negatif
    if (quantity <= 0) {
        return res.status(400).json({ message: 'Quantity harus lebih dari 0' });
    }

    // Query untuk menambahkan stok ramuan obat ke dalam suatu toko atau apotek berdasarkan ID ramuan
    const query = `
        UPDATE FormulaIngredientsRelation
        SET quantity = quantity + ?
        WHERE formula_id = ?
    `;
    db.query(query, [quantity, formulaId], (err, result) => {
        if (err) {
            console.error('Error adding herbal formula stock:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan stok ramuan obat' });
        }

        // Periksa apakah ramuan obat dengan ID yang diberikan ditemukan
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ramuan obat tidak ditemukan' });
        }

        // Berhasil menambahkan stok ramuan obat, kembalikan response sukses
        return res.status(200).json({ message: 'Stok ramuan obat berhasil ditambahkan' });
    });
};

// Controller untuk memperbarui jumlah stok ramuan obat dalam suatu toko atau apotek berdasarkan ID ramuan
const updateHerbalFormulaStock = (req, res) => {
    const formulaId = req.params.formulaId;
    const { quantity } = req.body;

    // Pastikan quantity yang dikirim tidak negatif
    if (quantity < 0) {
        return res.status(400).json({ message: 'Quantity tidak boleh negatif' });
    }

    // Query untuk memperbarui jumlah stok ramuan obat dalam suatu toko atau apotek berdasarkan ID ramuan
    const query = `
        UPDATE FormulaIngredientsRelation
        SET quantity = ?
        WHERE formula_id = ?
    `;
    db.query(query, [quantity, formulaId], (err, result) => {
        if (err) {
            console.error('Error updating herbal formula stock:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui stok ramuan obat' });
        }

        // Periksa apakah ramuan obat dengan ID yang diberikan ditemukan
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ramuan obat tidak ditemukan' });
        }

        // Berhasil memperbarui jumlah stok ramuan obat, kembalikan response sukses
        return res.status(200).json({ message: 'Jumlah stok ramuan obat berhasil diperbarui' });
    });
};

// Controller untuk menghapus stok ramuan obat dari suatu toko atau apotek berdasarkan ID ramuan
const deleteHerbalFormulaStock = (req, res) => {
    const formulaId = req.params.formulaId;

    // Query untuk menghapus stok ramuan obat dari suatu toko atau apotek berdasarkan ID ramuan
    const query = `
        UPDATE FormulaIngredientsRelation
        SET quantity = 0
        WHERE formula_id = ?
    `;
    db.query(query, [formulaId], (err, result) => {
        if (err) {
            console.error('Error deleting herbal formula stock:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus stok ramuan obat' });
        }

        // Periksa apakah ramuan obat dengan ID yang diberikan ditemukan
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ramuan obat tidak ditemukan' });
        }

        // Berhasil menghapus stok ramuan obat, kembalikan response sukses
        return res.status(200).json({ message: 'Stok ramuan obat berhasil dihapus' });
    });
};


module.exports = { addHerbalFormula, getAllHerbalFormulas, getHerbalFormulaById,deleteHerbalFormula,updateHerbalFormula,addIngredientToFormula,getIngredientsInFormula,deleteIngredientFromFormula,updateIngredientInFormula, getHerbalFormulasByIngredient,getHerbalFormulaStock, addHerbalFormulaStock, updateHerbalFormulaStock, deleteHerbalFormulaStock};