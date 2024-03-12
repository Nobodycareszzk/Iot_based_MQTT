const createResBody = require("../utils/resBody");
const userService = require("../service/userService");

async function updateUserInfo(req, res, next) {
  const { username, password, phone, email } = req.body;
  try {
    const result = await userService.updateUserInfo(
      username,
      password,
      phone,
      email
    );
    console.log("数据库修改返回：", result);
    res.json(createResBody(2000, "用户信息修改成功"));
  } catch (error) {
    console.log("updateUserInfo", error);
    res.json(createResBody(-2001, "用户信息修改失败"));
  }
}

module.exports = { updateUserInfo };
