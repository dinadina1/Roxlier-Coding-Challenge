// import required module
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// set path
dotenv.config({path: path.join(__dirname,'config/config.env')});

// function to connect database
const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(
        ()=> console.log(`Database Connected Successfully`)
    ).catch(err => {
        console.log(`Database connection failed`,err);
        process.exit(1); // Exit process if connection is failed
    })
}

// export function
module.exports = connectDatabase;
