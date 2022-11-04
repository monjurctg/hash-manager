const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const GloovalError = require("./middlewares/GloovalError");
const userRoute = require("./routes/v1/user-route");

// global middile ware
app.use(express.json());
app.use(cors({origin: "*"}));
app.use(express.static("public"));

// routes
app.get("/", (req, res) => {
  console.log("hello");
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
// user route
app.use("/api", userRoute);

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on the server`, 404));
});

// error handling middleware
app.use(GloovalError);

module.exports = app;
