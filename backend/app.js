// import required modules
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config/config.env") });
const product = require("./routes/product");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");

// parse req.body into json
app.use(express.json());

app.use(
    cors({
      origin: [
        "http://54.225.3.56",
        "http://54.225.3.56:3500",
        "http://localhost:3000",
        "http://localhost:3500",
      ],
      credentials: false, // Allow cookies and authorization headers across domains if needed
      methods: ["GET", "POST", "PUT", "DELETE"], // Define allowed methods as per your API
    })
  );
  

// routes
app.use("/api/v1", product);

// send buildfile if it is production
if (process.env.NODE_ENV === "production") {
  // serve static folder
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// error middleware to catch error
app.use(errorMiddleware);

// export app
module.exports = app;
