const nodemailer = require("nodemailer");

const sendEmail = async (email, name, ceo_id, role_id, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL_FROM}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
      port: 587,
      secure: false,
    },
  });

  let editName = name.replace(" ", "_");
  console.log(editName);

  subject = "message from team hash code";
  body = `You are invited to join http://localhost:3000/user-register/${editName}/${email}/${ceo_id}/${role_id} ,Sign up with your email`;

  const mailOptions = {
    from: `${process.env.EMAIL_FROM}`,
    to: email,
    subject: subject,
    text: body,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({message: "invite send successfully"});
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
