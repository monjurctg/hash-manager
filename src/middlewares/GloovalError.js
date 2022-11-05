const sendErrorDev = (err, res) => {
  console.log(err, "errr from error dev");
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR 💥", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log("Find an error".bgRed.white.bold);

  console.log(`${(err?.message, err)}`.red.bold);

  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? "error";
  console.log("first");

  if (process.env.NODE_ENV == "development") {
    console.log("err dev");
    sendErrorDev(err, res);
  } else {
    console.log("err dev else");

    sendErrorProd(err, res);
  }
};
