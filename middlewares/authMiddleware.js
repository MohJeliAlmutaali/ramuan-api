// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi token JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Memverifikasi token
    const decoded = jwt.verify(token.split(' ')[1], 'jwt_secret'); // Menggunakan token kedua setelah spasi
    req.user = decoded; // Mengatur objek req.user ke decoded tanpa nested property user
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = verifyToken;
