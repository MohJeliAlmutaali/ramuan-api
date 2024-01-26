// controllers/userController.js

const db = require('../config/database');
const jwt = require('jsonwebtoken');

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  db.query('SELECT * FROM Users WHERE email = ? AND password_hash = ?', [email, password], (err, results) => {
    if (err) {
      console.error('Error checking existing user:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ user_id: results[0].user_id }, 'jwt_secret', { expiresIn: '1h' }); // Ganti 'jwt_secret' dengan secret key yang lebih aman

    res.status(200).json({ message: 'Login successful', token });
  });
};



// Mendapatkan informasi profil pengguna
exports.getUserProfile = (req, res) => {
  const userId = req.user.user_id;

  // Kueri SQL untuk mengambil informasi profil pengguna dari tabel users berdasarkan ID pengguna
  const sql = `SELECT * FROM Users WHERE user_id = ?`;
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error getting user profile:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    // Jika pengguna ditemukan, kembalikan informasi profil pengguna
    if (result.length > 0) {
      const userProfile = result[0];
      res.status(200).json(userProfile);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
};