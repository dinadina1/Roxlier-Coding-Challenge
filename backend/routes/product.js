// import required modules
const express = require("express");
const router = express.Router();
const {
  seedProducts,
  getTransactions,
  getStatistics,
  barChart,
  pieChart,
  combinedProductInfo,
  getTransaction,
} = require("../controllers/productController");

// Api end points
router.get("/seed", seedProducts);
router.get("/transactions", getTransactions);
router.get("/statistics", getStatistics);
router.get("/barchart", barChart);
router.get("/piechart", pieChart);
router.get("/productInfo", combinedProductInfo);
router.get("/transaction/:id", getTransaction);

// export router
module.exports = router;
