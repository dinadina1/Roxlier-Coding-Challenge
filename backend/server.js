// import required modules
const app = require("./app");
const connectDatabase = require("./config/database");

// connect database
connectDatabase();

// start server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

// handle unhandledRejection error
process.on("unhandledRejection", (err) => {
  console.log("Error:", err.message);
  console.log("Shutting down the server due to unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});

// handle uncaughtException error
process.on("uncaughtException", (err) => {
  console.log("Error:", err.message);
  console.log("Shutting down the server due to unhandled exception");
  server.close(() => {
    process.exit(1);
  });
});
