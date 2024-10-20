// import required modules
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config({path: path.join(__dirname,"config/config.env")});
const product = require('./routes/product');
const errorMiddleware = require('./middleware/error');
const cors = require('cors');

// parse req.body into json
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1', product);

// send buildfile if it is production
if(process.env.NODE_ENV === "production"){
    // serve static folder
    app.use(express.static(path.join(__dirname,"../frontend/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
};

// error middleware to catch error
app.use(errorMiddleware);

// export app
module.exports = app;