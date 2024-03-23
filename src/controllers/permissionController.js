const createResbody = require("../utils/resBody");
const { getPermisson } = require("../service/permissionService.js");

async function getPermissonByRoleId(req, res, next) {
  const userId = req.params.id;
  try {
    const result = await getPermisson(userId);
    const data = { permissions: result, total: result.length };
    res.json(createResbody(2000, "获取成功", data));
  } catch (error) {
    res.json(createResbody(-2002, "获取失败", error));
  }
}

module.exports = { getPermissonByRoleId };
