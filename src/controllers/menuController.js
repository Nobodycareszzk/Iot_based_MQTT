const createResBody = require("../utils/resBody");
const { getMenuTree } = require("../service/menuService");

async function getMenuTreeByRoleId(req, res, next) {
  const userId = res.locals.user.id;

  try {
    const menuTree = await getMenuTree(userId);
    res.json(createResBody(2000, "获取成功", menuTree));
  } catch (error) {
    res.json(createResBody(-2010, "获取失败", error));
  }
}

module.exports = { getMenuTreeByRoleId };
