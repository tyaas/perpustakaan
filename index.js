// memanggil library express
const express = require('express');
// menginisialisasi express sebagai app
const app = express();
// port yang digunakan
const port = 3002;

// memanggil library body-parser
const bodyParser = require('body-parser');
// memanggil config database
const db = require('./config');

// memanggil costum response
const response = require('./request');

// express menggunakan body-parser
app.use(bodyParser.json());

// route get mahasiswa untuk menampilkan semua data mahasiswa
app.get('/mahasiswa', (req, res) => {
    const sql = "SELECT * FROM tb_mahasiswa";
    db.query(sql, (err, result) => {
        response(200, result, 'data mahasiswa', res)
    });
});

// route post mahasiswa untuk menambahkan data mahasiswa
app.post('/mahasiswa', (req, res) => {
    const { nama, npm, alamat } = req.body;
    const sql = `INSERT INTO tb_mahasiswa (nama, npm, alamat) VALUES ( '${nama}', '${npm}', '${alamat}')`;

    db.query(sql, (error, fields) => {
        if (error) response(500, 'invalid', `${nama} dan ${npm} dan ${alamat} gagal ditambahkan `, res);
        if (fields?.affectedRows) {
            const data = {
                isSucces: fields.affectedRows,
                id: fields.insertId,
            }
            response(200, data, "data berhasil disimpan", res);
        }});
})

// run server dengan port menggunakan variable port
app.listen(port, () => {
    console.log(`Running in port ${port}`);
});
