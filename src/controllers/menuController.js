const createResBody = require("../utils/resBody");
const { getMenuTree } = require("../service/menuService");

async function getMenuTreeByRoleId(req, res, next) {
  const userId = req.params.id;

  try {
    const menuTree = await getMenuTree(userId);
    const data = { menu: menuTree, total: menuTree.length };
    res.json(createResBody(2000, "获取成功", data));
  } catch (error) {
    res.json(createResBody(-2010, "获取失败", error));
  }
}

module.exports = { getMenuTreeByRoleId };
