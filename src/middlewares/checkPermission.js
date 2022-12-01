const User = require("../models/user-model");
const userService = require("../services/user-service");
const sendEmail = require("../utils/mail-service");

module.exports = async function (req, res, next) {
  // console.log(_id);
  const {email, name} = req.body;
  const {ceo_id, role_id} = req.params;
  let url = req.url.split("/")[2];
  console.log(url, "url");

  if (url === "invite") {
    let user = await User.find({_id: ceo_id});
    console.log(user, "user");

    if (user.length > 0) {
      if (user[0].is_ceo) {
        sendEmail(email, name, ceo_id, role_id, res);
        // next();
        return;
      } else {
        res.status(401).json({
          success: false,
          messsage: "you have no permission to add user",
        });
      }
    } else {
      res.status(401).json({success: false, messsage: " please login as CEO "});
    }
  } else {
    next();
  }
};
