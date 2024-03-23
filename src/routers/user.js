const express = require("express");
const { verifyToken, verifyLogin } = require("../middleware/loginMiddleware");
const { updateUserInfo, getAllUsers } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/update", verifyLogin, verifyToken, updateUserInfo);
userRouter.get("/query/list", verifyToken, getAllUsers);

module.exports = userRouter;
