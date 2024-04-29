const mysql = require("mysql");

const db = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6702752",
    database: "sql6702752",
    password: "2fNI1JAZk8",
});

module.exports = db;