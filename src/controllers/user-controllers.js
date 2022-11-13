const userService = require("../services/user-service");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const sendEmail = require("../utils/mail-service");

const JWT_SECRET = process.env.JWT_SECRET;

const userControllers = {};

userControllers.addUser = async (req, res, next) => {
  console.log(req.params, "params");
  const {password, email, name} = req.body;
  const {ceo_id, role_id} = req.params;
  const hashedPassword = await bcrypt.hash(password, 10);

  let url = req.url.split("/")[2];

  if (url === "invite") {
    sendEmail(email, name, ceo_id, role_id);
  }
  // if (url === "register") {
  // } else {
  // }
  let newUser = {
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
userControllers.getUsers = async (req, res) => {
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
    return res.status(500).json({
      status: "error",
      message: "inviled email or password",
    });
  }
  if (await bcrypt.compare(password, user.password)) {
    user.password = "";
    const token = jwt.sign({user}, `${JWT_SECRET}`);

    return res
      .status(200)
      .json({success: true, message: "Login successully", token});
  } else {
    return res
      .status(500)
      .json({success: false, error: "inviled username or password"});
  }
};

// exports controller
module.exports = userControllers;
