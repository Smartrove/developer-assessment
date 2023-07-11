const mongoose = require("mongoose");
const dotenv = require("dotenv/config");

const connection = mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log(`database connected successfully`))
  .catch((error) => console.log(error.message));
