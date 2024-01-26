// config/database.js

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // Sesuaikan dengan username MySQL Anda
  password: '12345', // Sesuaikan dengan password MySQL Anda
  database: 'ramuan_db' // Sesuaikan dengan nama database yang telah Anda buat sebelumnya
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
