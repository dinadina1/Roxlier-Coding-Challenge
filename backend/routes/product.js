// import required modules
const express = require('express');
const router = express.Router();
const {seedProducts, getTransactions} = require('../controllers/productController');

// Api end points
router.get("/seed", seedProducts);
router.get("/transactions", getTransactions);

// export router
module.exports = router;