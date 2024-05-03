const express = require('express');
const app = express();
const port = 3002;
const bodyParser = require('body-parser');
const db = require('./config.js');
const response = require('./request.js');

app.use(bodyParser.json());

// GET endpoint untuk mendapatkan data anggota, buku, dan petugas
app.get('/', (req, res) => {
    const sqlAnggota = 'SELECT * FROM anggota';
    const sqlBuku = 'SELECT * FROM buku';
    const sqlPetugas = 'SELECT * FROM petugas';

    db.query(sqlAnggota, (errorAnggota, resultAnggota) => {
        db.query(sqlBuku, (errorBuku, resultBuku) => {
            db.query(sqlPetugas, (errorPetugas, resultPetugas) => {
                if (errorAnggota || errorBuku || errorPetugas) {
                    response(500, 'error', 'Gagal mengambil data dari tabel', res);
                } else {
                    const data = {
                        anggota: resultAnggota,
                        buku: resultBuku,
                        petugas: resultPetugas
                    };
                    response(200, data, 'Data dari semua tabel', res);
                }
            });
        });
    });
});

// GET endpoint untuk mendapatkan data anggota
app.get('/anggota', (req, res) => {
    const sql = 'SELECT * FROM anggota';
    db.query(sql, (error, result) => {
        response(200, result, 'Data anggota', res);
    });
});

// GET endpoint untuk mendapatkan data buku
app.get('/buku', (req, res) => {
    const sql = 'SELECT * FROM buku';
    db.query(sql, (error, result) => {
        response(200, result, 'Data buku', res);
    });
});

// GET endpoint untuk mendapatkan data petugas
app.get('/petugas', (req, res) => {
    const sql = 'SELECT * FROM petugas';
    db.query(sql, (error, result) => {
        response(200, result, 'Data petugas', res);
    });
});

// POST endpoint untuk menambah data anggota
app.post('/anggota', (req, res) => {
    const { id_anggota, kode_anggota, nama_anggota } = req.body;
    const sql = `INSERT INTO anggota (id_anggota, kode_anggota, nama_anggota) VALUES ('${id_anggota}', '${kode_anggota}', '${nama_anggota}')`;
    db.query(sql, (error, result) => {
        if (error) response(500, 'invalid', `Gagal menambahkan anggota ${nama_anggota}`, res);
        if (result?.affectedRows) {
            const data = {
                isSuccess: result.affectedRows,
                id: result.insertId,
            };
            response(200, data, "Data berhasil ditambahkan", res);
        }
    });
});

// POST endpoint untuk menambah data buku
app.post('/buku', (req, res) => {
    const { id_buku, kode_buku, judul_buku } = req.body;
    const sql = `INSERT INTO buku (id_buku, kode_buku, judul_buku) VALUES ('${id_buku}', '${kode_buku}', '${judul_buku}')`;
    db.query(sql, (error, result) => {
        if (error) response(500, 'invalid', `Gagal menambahkan buku ${judul_buku}`, res);
        if (result?.affectedRows) {
            const data = {
                isSuccess: result.affectedRows,
                id: result.insertId,
            };
            response(200, data, "Data berhasil ditambahkan", res);
        }
    });
});

// POST endpoint untuk menambah data petugas
app.post('/petugas', (req, res) => {
    const { id_petugas, nama_petugas, jabatan_petugas } = req.body;
    const sql = `INSERT INTO petugas (id_petugas, nama_petugas, jabatan_petugas) VALUES ('${id_petugas}', '${nama_petugas}', '${jabatan_petugas}')`;
    db.query(sql, (error, result) => {
        if (error) response(500, 'invalid', `Gagal menambahkan petugas ${nama_petugas}`, res);
        if (result?.affectedRows) {
            const data = {
                isSuccess: result.affectedRows,
                id: result.insertId,
            };
            response(200, data, "Petugas berhasil ditambahkan", res);
        }
    });
});

app.listen(port, () => {
    console.log(`Running on port http://localhost:${port}`);
});
