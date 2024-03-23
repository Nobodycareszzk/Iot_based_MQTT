const connection = require("../utils/databaseConnect");

async function getPermisson(userId) {
  try {
    const [role] = await connection.execute("SELECT roleId FROM user_role WHERE userId = ?", [userId]);

    const roleId = role[0].roleId;

    // 使用 JOIN 操作一次性获取所有权限信息
    const [permisson] = await connection.execute(
      `
      SELECT p.*
      FROM role_permission rp
      JOIN permission p ON rp.permissionId = p.id
      WHERE rp.roleId = ?;
    `,
      [roleId]
    );

    return permisson;
  } catch (error) {
    console.error("获取权限失败:", error);
    throw error;
  }
}

module.exports = { getPermisson };
