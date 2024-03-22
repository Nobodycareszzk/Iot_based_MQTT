const userService = require("../service/userService");
const createResBody = require("../utils/resBody");
const { SECRET_KEY } = require("../config/config");
const jwt = require("jsonwebtoken");

// 登录验证：验证用户名和密码是否为空，用户名是否存在，密码是否正确
const verifyLogin = async (req, res, next) => {
  // 验证客户端传递过来的user是否可以保存到数据库中
  // 1.验证用户名和密码是否为空
  console.log("接收到的body:", req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    res.json(createResBody(-1001, "用户名或密码不能为空"));
    return;
  }
  // 2.判断name是否在数据库中已经存在 数据库查询返回的是数组
  const [user] = await userService.getUserByUsername(username);
  console.log("验证登录数据库查询返回:", user);
  if (!user) {
    res.json(createResBody(-1002, "该用户名不存在"));
    return;
  }
  if (user.password !== password) {
    res.json(createResBody(-1003, "密码错误,请重新输入"));
    return;
  }
  res.locals.user = user;
  next();
};

// token验证：验证token是否存在，是否有效
const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.json(createResBody(-1004, "token不存在"));
    return;
  }
  const token = authorization.replace("Bearer ", "");
  console.log("token:", token);
  try {
    const result = jwt.verify(token, SECRET_KEY);
    // result为payload
    console.log("token解析结果:", result);
    res.locals.user = result;
    next();
  } catch (err) {
    res.json(createResBody(-1005, "token无效或已过期"));
  }
};

module.exports = { verifyLogin, verifyToken };
