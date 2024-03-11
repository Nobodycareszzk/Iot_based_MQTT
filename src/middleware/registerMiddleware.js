const userService = require("../service/userService");
const createResBody = require("../utils/resBody");
const cryptoPassword = require("../utils/cryptoPassword");

const verifyRegister = async (req, res, next) => {
  // 验证客户端传递过来的user是否可以保存到数据库中
  // 1.验证用户名和密码是否为空
  const { username, password } = req.body;
  if (!username || !password) {
    res.json(createResBody(400, "用户名或密码不能为空"));
    return;
  }
  // 2.判断name是否在数据库中已经存在
  const user = await userService.getUserByUsername(username);
  if (user.length > 0) {
    res.json(createResBody(400, "该用户名已被使用"));
    return;
  }
  next();
};

const encryptPassword = (req, res, next) => {
  // 对密码进行加密
  const { password } = req.body;
  req.body.password = cryptoPassword(password);
  next();
};
module.exports = { verifyRegister, encryptPassword };
