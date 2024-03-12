const connection = require("../utils/databaseConnect");

// 添加设备
async function addDevice(userId, deviceName, productId) {
  try {
    // 获取当前时间
    const createTime =
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    const deviceStatus = 0;
    // 执行预处理语句添加设备
    const statement =
      "INSERT INTO device (userId, deviceName, productId, deviceStatus, createTime) VALUES (?, ?, ?, ?, ?)";
    const [result] = await connection.execute(statement, [
      userId,
      deviceName,
      productId,
      deviceStatus,
      createTime,
    ]);
    if (result.affectedRows === 0) {
      throw new Error("Device insert failed");
    }

    // 返回插入的设备ID
    return result.insertId;
  } catch (error) {
    // 处理错误
    console.error("Error adding device:", error);
    throw error;
  }
}

// 删除设备的函数
async function deleteDevice(userId, deviceId) {
  try {
    // 执行预处理语句删除设备
    const statement = "DELETE FROM device WHERE deviceId = ? AND userId = ?";
    const [result] = await connection.execute(statement, [deviceId, userId]);
    if (result.affectedRows === 0) {
      throw new Error("Device not found");
    }

    // 返回受影响的行数
    return result.affectedRows;
  } catch (error) {
    // 处理错误
    console.error("Error deleting device:", error);
    throw error;
  }
}

//更新设备信息的函数
async function updateDevice(userId, deviceId, deviceName, productId) {
  try {
    const curStatus = await getDeviceStatus(userId, deviceId);
    // 执行预处理语句更新设备信息
    const statement =
      "UPDATE device SET deviceName = ?, productId = ?, deviceStatus = ? WHERE userId = ? AND deviceId = ?";
    const [result] = await connection.execute(statement, [
      deviceName,
      productId,
      curStatus,
      userId,
      deviceId,
    ]);
    if (result.affectedRows === 0) {
      throw new Error("Device not found");
    }
    // 返回设备的用户ID
    return result.insertId;
  } catch (error) {
    // 处理错误
    console.error("Error updating device:", error);
    throw error;
  }
}

// 查询单个设备信息
async function getDevice(userId, deviceId) {
  try {
    // 执行预处理语句查询设备
    const [result] = await connection.execute(
      "SELECT * FROM device WHERE userId = ? AND deviceId = ?",
      [userId, deviceId]
    );
    if (result.length === 0) {
      throw new Error("Device not found");
    }
    console.log("数据库的返回", result);
    // 返回查询结果（可能为空）
    return result;
  } catch (error) {
    // 处理错误
    console.error("Error fetching device:", error);
    throw error;
  }
}

// 修改设备当前状态
async function changeDeviceStatus(userId, deviceId) {
  try {
    const curStatus = await getDeviceStatus(userId, deviceId);
    const newStatus = curStatus === 0 ? 1 : 0;
    const [result] = await connection.execute(
      "UPDATE device SET deviceStatus = ? WHERE userId = ? AND deviceId = ?",
      [newStatus, userId, deviceId]
    );

    if (result.affectedRows < 0) {
      throw new Error("Status change failed");
    }
    return result.insertId;
  } catch (error) {
    console.error("Error updating device status:", error);
    throw error;
  }
}

// 查询设备当前状态
async function getDeviceStatus(userId, deviceId) {
  try {
    const [result] = await connection.execute(
      "SELECT deviceStatus FROM device WHERE userId = ? AND deviceId = ?",
      [userId, deviceId]
    );

    if (result.length === 0) {
      throw new Error("Device not found");
    }

    console.log("数据库查询:", result[0].deviceStatus);
    return result[0].deviceStatus;
  } catch (error) {
    console.error("Error fetching device status:", error);
    throw error;
  }
}

// 查询当前用户的所有设备
async function getAllDevices(userId) {
  try {
    const [result] = await connection.execute(
      "SELECT * FROM device WHERE userId = ?",
      [userId]
    );
    return result;
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
}

module.exports = {
  getDevice,
  updateDevice,
  deleteDevice,
  addDevice,
  getDeviceStatus,
  changeDeviceStatus,
  getAllDevices,
};
