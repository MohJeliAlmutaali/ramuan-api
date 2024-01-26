// models/User.js

const db = require('../config/database');

// Definisikan model User
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // Metode untuk menyimpan pengguna ke database
  save() {
    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    const values = [this.username, this.email, this.password];
    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}

module.exports = User;
