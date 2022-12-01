const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const GloovalError = require("./middlewares/GloovalError");
// import all route
const userRoute = require("./routes/v1/user-route");
const projectRoute = require("./routes/v1/project-route");
const clientsRoute = require("./routes/v1/client-route");
const taskRoute = require("./routes/v1/task_routes");

// global middile ware
app.use(express.json());
// app.use(cors({origin: ["http://localhost:3000"]}));
app.use(cors({origin: "*"}));
app.use(express.static("public"));

// home routes
app.get("/", (req, res) => {
  // console.log("hello");
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// use all route

app.use("/api", userRoute);
app.use("/api/projects", projectRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/tasks", taskRoute);

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on the server`, 404));
});

// error handling middleware
app.use(GloovalError);

module.exports = app;
