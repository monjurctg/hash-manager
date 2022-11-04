const userService = require("../services/user-service");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const JWT_SECRET = process.env.JWT_SECRET;

const userControllers = {};

userControllers.addUser = async (req, res, next) => {
  // console.log(req.body);
  const {password} = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    ...req.body,
    password: hashedPassword,
  };
  try {
    await userService.createUser(newUser);

    res.status(200).json({
      status: "sucess",
      message: "user add successfully",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(500).json({
        status: "error",
        errors: "duplicate ",
        message: "username or email already exist",
      });
    }

    res.status(500).json({
      errors: `user not save ${err}`,
    });
  }
};

// get all user
userControllers.getALlUser = async (req, res) => {
  const filters = req.filters;
  const queries = req.queries;
  try {
    const result = await userService.getUsers(filters, queries);
    res.status(200).json({data: result});
  } catch (err) {
    throw Error(err);
  }
};

userControllers.login = async (req, res) => {
  const {email, password} = req.body;
  // console.log(username)
  const user = await userService.singleUser(email);

  if (!user) {
    return res
      .status(500)
      .json({status: "error", message: "inviled email or password"});
  }
  if (await bcrypt.compare(password, user.password)) {
    user.password = "";
    const token = jwt.sign(
      {
        user: user,
      },
      `${JWT_SECRET}`
    );

    return res.status(200).json({status: "ok", token: token, user});
  } else {
    return res
      .status(500)
      .json({status: "error", error: "inviled username or password"});
  }
};

// exports controller
module.exports = userControllers;
