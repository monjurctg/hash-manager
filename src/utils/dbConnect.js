const {default: mongoose} = require("mongoose");

console.log("HASH_DB_USERNAME", process.env.HASH_DB_USERNAME);
const dbConnect = () => {
  let uri = `mongodb+srv://${process.env.HASH_DB_USERNAME}:${process.env.HASH_DB_PASSWORD}@cluster0.ottxxiw.mongodb.net/Hash-manager?retryWrites=true&w=majority`;
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`DB Connection Successfull!`.bgGreen.white.bold);
    })
    .catch((err) => {
      console.log("DB Connection Failed!".bgRed.white.bold);
      console.log(`${err.message}`.red.bolod);
    });
};
module.exports = dbConnect;
