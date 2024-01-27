// models/FormulaIngredientsRelation.js
const db = require('../config/database');

class FormulaIngredientsRelation {
    static addIngredientToFormula(formulaId, ingredientId, quantity, callback) {
        const insertQuery = 'INSERT INTO FormulaIngredientsRelation (formula_id, ingredient_id, quantity) VALUES (?, ?, ?)';
        db.query(insertQuery, [formulaId, ingredientId, quantity], (err, result) => {
            if (err) {
                console.error('Error adding ingredient to formula:', err);
                return callback(err, null);
            }
            return callback(null, result);
        });
    }

    static getIngredientsInFormula(formulaId, callback) {
        const selectQuery = 'SELECT Ingredients.* FROM Ingredients JOIN FormulaIngredientsRelation ON Ingredients.ingredient_id = FormulaIngredientsRelation.ingredient_id WHERE FormulaIngredientsRelation.formula_id = ?';
        db.query(selectQuery, [formulaId], (err, result) => {
            if (err) {
                console.error('Error getting ingredients in formula:', err);
                return callback(err, null);
            }
            if (result.length === 0) {
                return callback(null, []); // Tidak ada bahan yang ditemukan dalam formula
            }
            return callback(null, result);
        });
    }

    
    static deleteIngredientFromFormula(formulaId, ingredientId, callback) {
        const deleteQuery = 'DELETE FROM FormulaIngredientsRelation WHERE formula_id = ? AND ingredient_id = ?';
        db.query(deleteQuery, [formulaId, ingredientId], (err, result) => {
            if (err) {
                console.error('Error deleting ingredient from formula:', err);
                return callback(err, null);
            }
            if (result.affectedRows === 0) {
                return callback(null, false); // Bahan tidak ditemukan dalam formula
            }
            return callback(null, true); // Berhasil menghapus bahan dari formula
        });
    }

    static updateIngredientInFormula(formulaId, ingredientId, quantity, callback) {
        const updateQuery = 'UPDATE FormulaIngredientsRelation SET quantity = ? WHERE formula_id = ? AND ingredient_id = ?';
        db.query(updateQuery, [quantity, formulaId, ingredientId], (err, result) => {
            if (err) {
                console.error('Error updating ingredient in formula:', err);
                return callback(err, null);
            }
            if (result.affectedRows === 0) {
                return callback(null, false); // Bahan tidak ditemukan dalam formula
            }
            return callback(null, true); // Berhasil memperbarui detail bahan dalam formula
        });
    }

    static getHerbalFormulasByIngredient(ingredientId, callback) {
        const query = `
            SELECT hf.formula_id, hf.name AS formula_name, hf.description AS formula_description, hf.usage_instructions AS formula_usage_instructions
            FROM HerbalFormulas hf
            JOIN FormulaIngredientsRelation fir ON hf.formula_id = fir.formula_id
            WHERE fir.ingredient_id = ?
        `;
        db.query(query, [ingredientId], (err, result) => {
            if (err) {
                console.error('Error getting herbal formulas by ingredient:', err);
                return callback(err, null);
            }
            if (result.length === 0) {
                return callback(null, []); // Tidak ada ramuan obat yang mengandung bahan ramuan tersebut
            }
            return callback(null, result);
        });
    }
}

module.exports = FormulaIngredientsRelation;
