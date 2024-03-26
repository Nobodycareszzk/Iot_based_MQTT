const connection = require("../utils/databaseConnect");

// 添加用户的函数
async function addUser(username, password, phone, email) {
  const statementUser = "INSERT INTO user (username, password, phone, email) VALUES (?, ?, ?, ?)";
  const statementRole = "INSERT INTO user_role (userId, roleId) VALUES (?, ?)";
  try {
    // 执行预处理语句添加用户
    const [resultUser] = await connection.execute(statementUser, [username, password, phone, email]);
    const [resultRole] = await connection.execute(statementRole, [resultUser.insertId, 1]);

    // 返回插入的用户ID
    return resultUser.insertId;
  } catch (error) {
    // 处理错误
    console.error("Error adding user:", error);
    throw error;
  }
}

// 根据用户名查询用户的函数
async function getUserByUsername(username) {
  const statement = "SELECT * FROM user WHERE username = ?";
  try {
    // 执行预处理语句查询用户
    const [result] = await connection.execute(statement, [username]);
    if (result.length === 0) {
      return -1;
    }
    // 返回查询结果（可能为空）
    return result;
  } catch (error) {
    // 处理错误
    console.error("Error fetching user:", error);
    throw error;
  }
}

// 修改用户信息的函数
async function updateUserInfo(username, password, phone, email) {
  const statement = "UPDATE user SET password = ?, phone = ?, email = ? WHERE username = ?";
  try {
    // 执行预处理语句修改用户信息
    const [result] = await connection.execute(statement, [password, phone, email, username]);
    if (result.affectedRows === 0) {
      return -1;
    }
    // 返回修改的用户ID
    return result.insertId;
  } catch (error) {
    // 处理错误
    console.error("Error updating user:", error);
    throw error;
  }
}

// 删除用户的函数
async function deleteUser(id) {
  const statement = "DELETE FROM user WHERE id = ?";
  try {
    // 执行预处理语句删除用户
    const [result] = await connection.execute(statement, [id]);
    if (result.affectedRows === 0) {
      return -1;
    }
    // 返回删除的用户ID
    return result.insertId;
  } catch (error) {
    // 处理错误
    console.error("Error deleting user:", error);
    throw error;
  }
}

// 查询所有用户的函数
async function getAllUsers(page, pageSize) {
  const startIndex = (page - 1) * pageSize;

  const statement = `SELECT * FROM user
      LIMIT ?, ?;
`;

  try {
    const [result] = await connection.execute(statement, [String(startIndex), pageSize]);
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

module.exports = {
  addUser,
  getUserByUsername,
  updateUserInfo,
  deleteUser,
  getAllUsers,
};