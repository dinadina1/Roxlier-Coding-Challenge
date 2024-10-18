// import required modules
const mongoose = require('mongoose');

// product schema
const productSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
        required: [true, 'Please enter product title']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price']
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
    sold: {
        type: Boolean,
        default: false
    },
    dateOfSale: {
        type: Date,
        default: Date.now()
    }
});

// create product model
const productModel = mongoose.model('Product', productSchema);

// export schema
module.exports = productModel;