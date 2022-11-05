require("dotenv").config();
const colors = require("colors");
const app = require("./src/app");
const dbConnect = require("./src/utils/dbConnect");

process.on("uncaughtException", (error) => {
  // using uncaughtException event
  console.log(" uncaught Exception => shutting down..... ");
  console.log(error.name, error.message);
  process.exit(1); //  emidiatly exists all from all the requests
});

dbConnect();

const port = process.env.PORT ?? 5000;
const server = app.listen(port, () => {
  console.log(`server listening from ${port}`.bgBlue.yellow);
});

// handle Globaly  the unhandle Rejection Error which is  outside the express
// e.g database connection
process.on("unhandledRejection", (error) => {
  // it uses unhandledRejection event
  // using unhandledRejection event
  console.log(" Unhandled Rejection => shutting down..... ");
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1); //  emidiatly exists all from all the requests sending OR pending
  });
});
