// import required modules
const axios = require("axios");
const Product = require("../model/productModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

// Api for seed data to database from third party api - /api/v1/seed
exports.seedProducts = catchAsyncError(async (req, res, next) => {
  // get data from api
  const { data } = await axios.get(
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
  );

  // delete all data in database
  await Product.deleteMany({});

  // insert data into db
  await Product.insertMany(data);

  res.status(201).json({
    success: true,
    message: "Products inserted successfully"
  });
});

// get transaction with search and pagination - /api/v1/transaction
exports.getTransactions = catchAsyncError(async (req, res, next) => {

  // function to build query
  let buildQuery = () => {
  return new APIFeatures(Product.find(), req.query).monthWise().search().paginate();
  };

  // run query
  let products = await buildQuery().query;   
  let count = await buildQuery().query.countDocuments();   

  res.status(201).json({
    success: true,
    count,
    products
  })
});
