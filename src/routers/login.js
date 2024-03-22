const express = require("express");
const { verifyLogin, verifyToken } = require("../middleware/loginMiddleware");
const { signToken, refreshToken } = require("../controllers/loginController");

// 1.创建路由对象
const loginRouter = express.Router();

// 2.配置路由
loginRouter.post("/login", verifyLogin, signToken);
loginRouter.post("/refreshToken", refreshToken);

module.exports = loginRouter;
