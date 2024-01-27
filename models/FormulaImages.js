// models/FormulaImages.js
const db = require('../config/database');

class FormulaImages {
    static addImageToFormula(formulaId, imageUrl, caption, callback) {
        const insertQuery = 'INSERT INTO FormulaImages (formula_id, image_url, caption) VALUES (?, ?, ?)';
        db.query(insertQuery, [formulaId, imageUrl, caption], (err, result) => {
            if (err) {
                console.error('Error adding image to herbal formula:', err);
                return callback(err, null);
            }
            return callback(null, result);
        });
    }

    static getImageDetailById(imageId, callback) {
        const selectQuery = 'SELECT * FROM FormulaImages WHERE image_id = ?';
        db.query(selectQuery, [imageId], (err, result) => {
            if (err) {
                console.error('Error retrieving image detail:', err);
                return callback(err, null);
            }
            if (result.length === 0) {
                return callback(null, null); // Tidak ada gambar dengan ID yang sesuai
            }
            const imageData = result[0];
            return callback(null, imageData);
        });
    }

    static deleteImageFromFormula(imageId, callback) {
        const deleteQuery = 'DELETE FROM FormulaImages WHERE image_id = ?';
        db.query(deleteQuery, [imageId], (err, result) => {
            if (err) {
                console.error('Error deleting image from herbal formula:', err);
                return callback(err, null);
            }
            if (result.affectedRows === 0) {
                return callback(null, false); // Tidak ada gambar yang dihapus
            }
            return callback(null, true);
        });
    }

    static updateImageInFormula(imageId, imageUrl, caption, callback) {
        // Query untuk mengupdate informasi gambar pada ramuan obat berdasarkan ID gambar
        const updateQuery = 'UPDATE FormulaImages SET image_url = ?, caption = ? WHERE image_id = ?';
        db.query(updateQuery, [imageUrl, caption, imageId], (err, result) => {
            if (err) {
                console.error('Error updating image in herbal formula:', err);
                return callback(err, null);
            }
            // Jika tidak ada gambar yang diupdate, kembalikan respons dengan status 404
            if (result.affectedRows === 0) {
                return callback(null, false);
            }
            return callback(null, true);
        });
    }
}


module.exports = FormulaImages;
