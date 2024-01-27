const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Dapatkan token dari header Authorization
    const token = req.headers.authorization;

    // Periksa apakah token ada
    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, 'ramuan');
        req.userId = decoded.userId; // Simpan ID pengguna dalam request untuk penggunaan selanjutnya
        next(); // Lanjutkan ke middleware atau handler berikutnya
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).json({ message: 'Token tidak valid' });
    }
};

module.exports = authMiddleware;
