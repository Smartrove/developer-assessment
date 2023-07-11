const express = require("express");
const {
  userRegisterController,
  userLoginController,
  singleUserController,
  usersController,
} = require("../../controller/userController/userController");
const router = express.Router();

//create user route
//url http://localhost:7000/api/v1/user/
router.post("/register", userRegisterController);

//login user
router.post("/login", userLoginController);

router.get("/user/:id", singleUserController);
router.get("/all-users", usersController);

module.exports = router;
