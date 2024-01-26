// controllers/authController.js
const bcrypt = require('bcrypt');
const { createUser } = require('../models/user');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userId = await createUser({ username, email, password });
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { register };
