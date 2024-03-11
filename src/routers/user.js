const express = require("express");
const { verifyToken, verifyLogin } = require("../middleware/loginMiddleware");
const { updateUserInfo } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/update", verifyLogin, verifyToken, updateUserInfo);

module.exports = userRouter;
