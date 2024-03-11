const connection = require("../utils/database");

// 添加用户的函数
async function addUser(username, password, phone, email) {
  const statement =
    "INSERT INTO user (username, password, phone, email) VALUES (?, ?, ?, ?)";
  try {
    // 执行预处理语句添加用户
    const [result] = await connection.execute(statement, [
      username,
      password,
      phone,
      email,
    ]);

    // 返回插入的用户ID
    return result.insertId;
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
  const statement =
    "UPDATE user SET password = ?, phone = ?, email = ? WHERE username = ?";
  try {
    // 执行预处理语句修改用户信息
    const [result] = await connection.execute(statement, [
      password,
      phone,
      email,
      username,
    ]);

    // 返回修改的用户ID
    return result.insertId;
  } catch (error) {
    // 处理错误
    console.error("Error updating user:", error);
    throw error;
  }
}

// 删除用户的函数
async function deleteUser(username) {
  const statement = "DELETE FROM user WHERE username = ?";
  try {
    // 执行预处理语句删除用户
    const [result] = await pool.execute(statement, [username]);

    // 返回删除的用户ID
    return result.insertId;
  } catch (error) {
    // 处理错误
    console.error("Error deleting user:", error);
    throw error;
  }
}

module.exports = {
  addUser,
  getUserByUsername,
  updateUserInfo,
  deleteUser,
};
