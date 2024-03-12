const connection = require("../utils/databaseConnect");

// 查询某个主题是否存在
async function getTopic(topic) {
  const statement = `SELECT * FROM topiclist WHERE topic = ?`;
  try {
    const [result] = await connection.execute(statement[topic]);
    return result;
  } catch (error) {
    console.error("Error fetching topic:", error);
    throw error;
  }
}

// 添加主题
async function addTopic(userId, topic, topicName) {
  try {
    const isExist = await getTopic(topic);
    if (isExist.length > 0) {
      throw new Error("Topic is exist");
    }
    // 执行预处理语句添加主题
    const statement =
      "INSERT INTO topiclist (topic, userId,topicName) VALUES (?, ?, ?)";
    const [result] = await connection.execute(statement, [
      topic,
      userId,
      topicName,
    ]);
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

// 为设备添加主题
async function addTopicInDevice(deviceId, topic) {
  try {
    const statement = "INSERT INTO topicinfo (deviceId, topic) VALUES (?, ?)";
    const [result] = await connection.execute(statement, [deviceId, topic]);
    if (result.affectedRows === 0) {
      throw new Error("DeviceTopic insert failed");
    }
    return result.insertId;
  } catch (error) {
    console.error("Error adding deviceTopic:", error);
    throw error;
  }
}

// 为设备删除主题
async function removeTopicOutDevice(deviceId, topic) {
  try {
    const statement = "DELETE FROM topicinfo WHERE deviceId = ? AND topic = ?";
    const [result] = await connection.execute(statement, [deviceId, topic]);
    if (result.affectedRows === 0) {
      throw new Error("DeviceTopic not found");
    }
    return result.affectedRows;
  } catch (error) {
    console.error("Error deleting deviceTopic:", error);
    throw error;
  }
}

// 查询设备的订阅的主题

async function getDeviceTopics(deviceId) {
  try {
    const [result] = await connection.execute(
      "SELECT * FROM topicinfo WHERE deviceId = ?",
      [deviceId]
    );
    return result;
  } catch (error) {
    console.error("Error fetching deviceTopics:", error);
    throw error;
  }
}

module.exports = {
  addTopic,
  deleteTopic,
  getAllTopics,
  addTopicInDevice,
  removeTopicOutDevice,
  addTopicInDevice,
  getDeviceTopics,
};
