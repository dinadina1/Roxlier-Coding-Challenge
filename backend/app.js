// import required modules
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config({path: path.join(__dirname,"config/config.env")});
const product = require('./routes/product');
const errorMiddleware = require('./middleware/error');

app.use(express.json());

app.use('/api/v1', product);

app.use(errorMiddleware);

// export app
module.exports = app;