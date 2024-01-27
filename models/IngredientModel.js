// models/Ingredient.js

const db = require('../config/database');

class Ingredient {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  save() {
    const sql = `INSERT INTO Ingredients (name, description) VALUES (?, ?)`;
    const values = [this.name, this.description];
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

module.exports = Ingredient;
