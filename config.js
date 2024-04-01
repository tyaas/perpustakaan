// memanggil library mysql
const mysql = require('mysql');

// membuat koneksi ke database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_mahasiswa'
});

// export module db
module.exports = db;