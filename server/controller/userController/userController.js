const User = require("../../model/userModel/UserModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const { appError, AppError } = require("../../utils/appError");

const userRegisterController = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    //check if the user is already registered
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppError("Email already registered", 500));
    }
    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.json({ status: "success", msg: "User created", data: user });
  } catch (err) {
    next(appError(err.message));
  }
};

//login user
const userLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check if email exist
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return next(appError("invalid credentials"));
    }

    //verify password

    const isPasswordMatched = await bcrypt.compareSync(
      password,
      userFound.password
    );

    if (!isPasswordMatched) {
      return next(appError("invalid credentials"));
    }
    res.json({
      status: "success",
      msg: "User logged in successfully",
      data: {
        name: userFound.lastName,
        email: userFound.email,
        token: generateToken(userFound._id),
      },
    });
  } catch (err) {
    next(appError(err.message));
  }
};

const singleUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

const usersController = async (req, res, next) => {
  try {
    const user = await User.find();
    res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(appError(err.message));
  }
};

module.exports = {
  userLoginController,
  userRegisterController,
  singleUserController,
  usersController,
};
