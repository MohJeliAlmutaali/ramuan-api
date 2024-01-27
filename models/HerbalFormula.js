// models/HerbalFormula.js
const db = require('../config/database');

class HerbalFormula {
    static addHerbalFormula(name, description, usageInstructions, callback) {
        const insertQuery = 'INSERT INTO HerbalFormulas (name, description, usage_instructions) VALUES (?, ?, ?)';
        db.query(insertQuery, [name, description, usageInstructions], (err, result) => {
            if (err) {
                console.error('Error adding herbal formula:', err);
                return callback(err, null);
            }
            return callback(null, result);
        });
    }

    static getAllHerbalFormulas(callback) {
        const query = 'SELECT * FROM HerbalFormulas';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching herbal formulas:', err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    }

    static getHerbalFormulaById(formulaId, callback) {
        const query = 'SELECT * FROM HerbalFormulas WHERE formula_id = ?';
        db.query(query, [formulaId], (err, results) => {
            if (err) {
                console.error('Error fetching herbal formula by ID:', err);
                return callback(err, null);
            }
            if (results.length === 0) {
                return callback(null, null); // Formula tidak ditemukan
            }
            return callback(null, results[0]); // Mengembalikan formula yang ditemukan
        });
    }

    static deleteHerbalFormula(formulaId, callback) {
        const deleteQuery = 'DELETE FROM HerbalFormulas WHERE formula_id = ?';
        db.query(deleteQuery, [formulaId], (err, result) => {
            if (err) {
                console.error('Error deleting herbal formula:', err);
                return callback(err, null);
            }
            if (result.affectedRows === 0) {
                return callback(null, false); // Ramuan obat tidak ditemukan
            }
            return callback(null, true); // Berhasil menghapus ramuan obat
        });
    }

    static updateHerbalFormula(formulaId, name, description, usageInstructions, callback) {
        const updateQuery = 'UPDATE HerbalFormulas SET name = ?, description = ?, usage_instructions = ? WHERE formula_id = ?';
        db.query(updateQuery, [name, description, usageInstructions, formulaId], (err, result) => {
            if (err) {
                console.error('Error updating herbal formula:', err);
                return callback(err, null);
            }
            if (result.affectedRows === 0) {
                return callback(null, false); // Ramuan obat tidak ditemukan
            }
            return callback(null, true); // Berhasil mengupdate informasi ramuan obat
        });
    }
}



module.exports = HerbalFormula;
