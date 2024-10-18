// import required modules
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config({path: path.join(__dirname,"config/config.env")});



// export app
module.exports = app;