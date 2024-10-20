// import required modules
const axios = require("axios");
const Product = require("../model/productModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const process = require("process");

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
    message: "Products inserted successfully",
  });
});

// get transaction with search and pagination - /api/v1/transaction?search=&month=1,page=1
exports.getTransactions = catchAsyncError(async (req, res, next) => {
  // function to build query
  let buildQuery = () => {
    return new APIFeatures(Product.find(), req.query).monthWise();
  };

  // run query
  let products = await buildQuery().search().paginate().query;
  let count = await buildQuery().query.countDocuments();

  // send error if no data found
  if (!products) return next(new ErrorHandler("No data found", 404));

  res.status(201).json({
    success: true,
    count,
    products,
  });
});

// get statistics - /api/v1/statistics?month=1
exports.getStatistics = catchAsyncError(async (req, res, next) => {
  // calculate total sale price
  let response = await Product.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, parseInt(req.query.month)],
        },
        sold: true,
      },
    },
    {
      $group: {
        _id: null,
        totalSalePrice: { $sum: "$price" },
      },
    },
  ]);

  // calculate sold product count
  let soldProducts = await Product.countDocuments({
    $expr: {
      $eq: [{ $month: "$dateOfSale" }, parseInt(req.query.month)],
    },
    sold: true,
  });

  // calculate un sold product count
  let unSoldProducts = await Product.countDocuments({
    $expr: {
      $eq: [{ $month: "$dateOfSale" }, parseInt(req.query.month)],
    },
    sold: false,
  });

  // send error if no data found
  if (!response) return next(new ErrorHandler("No data found", 404));

  return res.status(201).json({
    success: true,
    statistics: {
      totalSalePrice: response[0].totalSalePrice,
      totalSoldItems: soldProducts,
      totalunSoldItems: unSoldProducts,
    },
  });
});

// barchart api - /api/v1/barchart?month=1
exports.barChart = catchAsyncError(async (req, res, next) => {
  // define price ranges
  let priceRanges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "900-above", min: 901, max: Infinity },
  ];

  // get count every price range
  let response = await Promise.all(
    priceRanges.map(async ({ range, min, max }) => {
      let count = await Product.countDocuments({
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, parseInt(req.query.month)],
        },
        $and: [{ price: { $gte: min } }, { price: { $lte: max } }],
      });

      return { range, count };
    })
  );

  // send error if no data found
  if (!response) return next(new ErrorHandler("No data found", 404));

  // send response
  return res.status(201).json({
    success: true,
    chart: response,
  });
});

// piechart api - /api/v1/piechart?month=1
exports.pieChart = catchAsyncError(async (req, res, next) => {
  // find category in db
  const categories = await Product.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, parseInt(req.query.month)],
        },
      },
    },
    {
      $group: {
        _id: "$category",
        noOfItems: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        noOfItems: 1,
      },
    },
  ]);

  // return error if no data found
  if (!categories) return next(new ErrorHandler("No data found", 404));

  // send response
  return res.status(201).json({
    success: true,
    categories,
  });
});

// get combined product info - /api/v1/productInfo?month=1
exports.combinedProductInfo = catchAsyncError(async (req, res, next) => {
  const { month } = req.query;

  const monthObj = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  // Function to fetch statistics for the selected month
  const statisticsApi = (month) =>
    axios.get(`${process.env.BACKEND_URL}/api/v1/statistics?month=${month}`);

  // Function to fetch bar chart data for the selected month
  const barchartApi = (month) =>
    axios.get(`${process.env.BACKEND_URL}/api/v1/barchart?month=${month}`);

  // Function to fetch pie chart data for the selected month
  const piechartApi = (month) =>
    axios.get(`${process.env.BACKEND_URL}/api/v1/piechart?month=${month}`);

  // Function to fetch data from all APIs
  const fetchAllData = async (month) => {
    try {
      // Fetch data from the three APIs in parallel
      const [statisticsResponse, barChartResponse, pieChartResponse] =
        await Promise.all([
          statisticsApi(month),
          barchartApi(month),
          piechartApi(month),
        ]);

      return {
        statistics: statisticsResponse.data.statistics,
        barchart: barChartResponse.data.chart,
        piechart: pieChartResponse.data.categories,
      };
    } catch (err) {
      // Handle errors from any API call
      return next(new ErrorHandler("Error fetching data", 500));
    }
  };

  // Call the function to fetch data
  const response = await fetchAllData(month);

  // Check if the response is empty
  if (!response) {
    return next(new ErrorHandler("Error fetching data", 500));
  }

  // Send the combined response
  res.status(200).json({
    month: monthObj[parseInt(month)],
    ...response,
  });
});

// get particular transaction - /api/v1/transaction/:id
exports.getTransaction = catchAsyncError(async (req, res, next) => {
  const transaction = await Product.findById(req.params.id);

  if (!transaction) {
    return next(new ErrorHandler("Transaction not found", 404));
  }

  res.status(200).json({
    success: true,
    transaction,
  });
});
