const connection = require("../utils/databaseConnect");

// 添加主题
async function addTopic(userId, topic) {
  try {
    // 执行预处理语句添加主题
    const statement = "INSERT INTO topiclist (topic, userId) VALUES (?, ?)";
    const [result] = await connection.execute(statement, [topic, userId]);
    if (result.affectedRows === 0) {
      throw new Error("Topic insert failed");
    }
    // 返回插入的设备ID (不设置主键的话不会默认增加 一直为0)
    return result;
  } catch (error) {
    // 处理错误
    console.error("Error adding topic:", error);
    throw error;
  }
}

// 删除主题的函数
async function deleteTopic(userId, topic) {
  try {
    // 执行预处理语句删除设备
    const statement = "DELETE FROM topiclist WHERE topic = ? AND userId = ?";
    const [result] = await connection.execute(statement, [topic, userId]);
    if (result.affectedRows === 0) {
      throw new Error("Topic not found");
    }

    // 返回受影响的行数
    return result.affectedRows;
  } catch (error) {
    // 处理错误
    console.error("Error deleting topic:", error);
    throw error;
  }
}

// 查询当前用户的所有主题
async function getAllTopics(userId) {
  try {
    const [result] = await connection.execute(
      "SELECT * FROM topiclist WHERE userId = ?",
      [userId]
    );
    return result;
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw error;
  }
}

module.exports = {
  addTopic,
  deleteTopic,
  getAllTopics,
};
