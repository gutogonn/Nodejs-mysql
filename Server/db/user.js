const mysql = require('mysql');
const con = mysql.createPool({
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USERNAME,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
  });

let app = {};

app.one = (id, email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE id = ? OR email = ? AND password = ?';
        con.query(sql, [id, email, password], (err, results) => { 
            if (err) return reject(err);
            return resolve(results[0]);
        });
    });
};

app.all = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users';
        con.query(sql, (err, results) => { 
            if (err) return reject(err);
            return resolve(results);
        });
    });
};


app.insert = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        con.query(sql, [email, password], (err, results) => { 
            if (err) return reject(err);
            let user = {"id": results.insertId, "email": email, "password": password};
            return resolve(user);
        });
    });
};

app.changePassword = (id, password) => {
    return new Promise((resolve, reject) => {
        con.query('UPDATE users SET password = ? WHERE id = ?', [password, id], (err, results) => { 
            if (err) return reject(err);
            return resolve(results[0]);
        });
    });
};

module.exports = app;