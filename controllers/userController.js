// controllers/userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
      // Hash password menggunakan bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Buat instans User baru dengan password yang di-hash
      const newUser = new User(username, email, hashedPassword);
      
      // Simpan pengguna baru ke dalam database
      await newUser.save();

      res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Failed to create user' });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Failed to get user' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { username, email, password } = req.body;
  try {
    const user = new User(username, email, password);
    user.user_id = userId;
    await user.update();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    await User.deleteById(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Cari pengguna berdasarkan username atau email
        const user = await User.findOne(username);
        
        // Periksa apakah pengguna ditemukan
        if (!user) {
            return res.status(401).json({ message: 'Email atau username tidak ditemukan' });
        }

        // Periksa apakah password cocok
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Buat token JWT
        const token = jwt.sign({ userId: user.user_id }, 'ramuan', { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login berhasil', userId: user.user_id, token });
    } catch (error) {
        console.error('Error while logging in:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat melakukan login' });
    }
};



module.exports = { createUser, getUserById, updateUser, deleteUser, loginUser };
