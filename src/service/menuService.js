const connection = require("../utils/databaseConnect");

async function getMenuTree(userId) {
  try {
    const [role] = await connection.execute("SELECT roleId FROM user_role WHERE userId = ?", [userId]);

    const roleId = role[0].roleId;

    // 使用 JOIN 操作一次性获取所有菜单信息
    const [rows] = await connection.execute(
      `
      SELECT m.id, m.name, m.type, m.url, m.icon, m.createAt, m.updateAt, m.parentId
      FROM menu m
      JOIN role_menu rm ON m.id = rm.menuId
      WHERE rm.roleId = ?
    `,
      [roleId]
    );

    // 使用递归构建树形结构
    const menuTree = buildMenuTree(rows);
    return menuTree;
  } catch (error) {
    console.error("获取菜单树失败:", error);
    throw error;
  }
}

function buildMenuTree(menuDetails, parentId = null) {
  const menuTree = [];

  // 遍历菜单详情，构建树形结构
  for (const menu of menuDetails) {
    if (menu.parentId === parentId) {
      const children = buildMenuTree(menuDetails, menu.id);
      if (children.length) {
        menu.children = children;
      }
      menuTree.push(menu);
    }
  }

  return menuTree;
}
module.exports = { getMenuTree };
