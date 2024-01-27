// models/User.js

const db = require('../config/database');

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  save() {
    const sql = `INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)`;
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

  static findById(userId) {
    const sql = `SELECT * FROM Users WHERE user_id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        if (result.length === 0) {
          resolve(null);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  update() {
    const sql = `UPDATE Users SET username = ?, email = ?, password_hash = ? WHERE user_id = ?`;
    const values = [this.username, this.email, this.password, this.user_id];
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

  static findOne(identifier) {
    const sql = `SELECT * FROM Users WHERE username = ? OR email = ?`;
    return new Promise((resolve, reject) => {
        db.query(sql, [identifier, identifier], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result.length === 0) {
                resolve(null);
            } else {
                resolve(result[0]);
            }
        });
    });
  }
  
  static deleteById(userId) {
    const sql = `DELETE FROM Users WHERE user_id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, result) => {
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
