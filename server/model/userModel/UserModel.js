const mongoose = require("mongoose");
//userschema

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "First Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    password: { type: String, required: [true, "password is required"] },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
