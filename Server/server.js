const http = require('http');
const dotenv = require('dotenv/config');
const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');

const app = express();

app.use(express.json());

app.use('/api/users', require('./routes/user_route'));

const server = http.createServer((req, res) => {
    res.statusCode = 200;
  });

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});