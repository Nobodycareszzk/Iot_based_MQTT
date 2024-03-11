const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");
const createResBody = require("../utils/resBody");

function signToken(req, res, next) {
  const { username, password } = req.body;
  const payload = { username, password };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 24 * 60 * 60 });
  res.json(createResBody(2000, "登录成功", { username, password, token }));
}
module.exports = { signToken };
