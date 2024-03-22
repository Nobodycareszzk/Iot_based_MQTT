const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");
const createResBody = require("../utils/resBody");

function signToken(req, res, next) {
  const user = res.locals.user;

  const payload = { username: user.username, id: user.id };
  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "30m" });
  const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
  res.json(
    createResBody(2000, "登录成功", {
      payload,
      accessToken,
      refreshToken,
    })
  );
}

function refreshToken(req, res, next) {
  const { refreshToken } = req.body;

  // 检查刷新令牌是否存在
  if (!refreshToken) {
    res.json(createResBody(-1004, "刷新令牌不存在"));
    return;
  }
  try {
    // 验证刷新令牌的有效性
    const result = jwt.verify(refreshToken, SECRET_KEY);
    const { username } = result;

    // 根据验证结果生成新的访问令牌
    const accessToken = jwt.sign({ username }, SECRET_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign({ username }, SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json(createResBody(2000, "刷新 Token 成功", accessToken, refreshToken));
  } catch (err) {
    res.json(createResBody(-1005, "刷新令牌无效或已过期"));
  }
}

module.exports = { signToken, refreshToken };
