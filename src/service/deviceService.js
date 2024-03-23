const connection = require("../utils/databaseConnect");

// 添加设备
/**
 * 1. 添加设备至设备表(deviceName,deviceType)
 * 2. 添加设备至用户设备表(userId,deviceId)
 * @param {number} userId
 * @param {string} deviceName
 * @param {string} devciceType
 * @returns 返回插入的设备ID
 */
async function addDevice(userId, deviceName, deviceType) {
  try {
    // 获取当前时间
    // 执行预处理语句添加设备
    const statementDevice = "INSERT INTO device (deviceName, deviceType) VALUES (?, ?)";
    const statementUserDevice = `INSERT INTO user_device (userId, deviceId) VALUES (?, ?)`;
    const [resultDevice] = await connection.execute(statementDevice, [deviceName, deviceType]);
    const [resultUserDevice] = await connection.execute(statementUserDevice, [userId, resultDevice.insertId]);

    if (resultDevice.affectedRows === 0 || resultUserDevice.affectedRows === 0) {
      throw new Error("Device insert failed");
    }
    // 返回插入的设备ID
    return resultDevice.insertId;
  } catch (error) {
    // 处理错误
    console.error("Error adding device:", error);
    throw error;
  }
}

// 查询当前用户的所有设备
/**
 *
 * @param {*} userId
 * @returns
 */
async function getDeviceList(userId, page, pageSize) {
  const startIndex = (page - 1) * pageSize;

  const statement = `SELECT device.*, device_product.*
  FROM device
  INNER JOIN device_product ON device.deviceId = device_product.deviceId
  WHERE device.deviceId IN (
    SELECT deviceId
    FROM user_device
    WHERE userId = ?
  )
  LIMIT ?, ?;
`;

  try {
    const [result] = await connection.execute(statement, [userId, String(startIndex), pageSize]);
    return result;
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
}

/**
 *
 * @param {*} userId
 * @param {*} deviceId
 * @returns
 */
// 查询单个设备信息
async function getDeviceInfo(deviceId) {
  const statement = `SELECT device.*, device_product.*
    FROM device
  JOIN device_product ON device.deviceId = device_product.deviceId
  WHERE device.deviceId = ?;`;
  try {
    // 执行预处理语句查询设备
    const [result] = await connection.execute(statement, [deviceId]);
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

// 删除设备的函数
async function deleteDevice(userId, deviceId) {
  try {
    // await connection.beginTransaction();

    // 删除 user_device 表中的记录
    const deleteStatement = "DELETE FROM user_device WHERE userId = ? AND deviceId = ?";
    const [resultUserDevice] = await connection.execute(deleteStatement, [userId, deviceId]);
    // 删除 device 表中的记录
    const deleteDeviceStatement = "DELETE FROM device WHERE deviceId = ?";
    const [resultDevice] = await connection.execute(deleteDeviceStatement, [deviceId]);
    if (resultUserDevice.affectedRows === 0 || resultDevice.affectedRows === 0) {
      return new Error("Device delete failed");
    }
  } catch (error) {
    console.error("删除设备失败:", error);
    throw error;
  }
}

// 更新设备信息的函数
async function updateDeviceInfo(deviceId, deviceName, deviceType) {
  try {
    // 更新 device 表中的设备信息
    const updateStatement = "UPDATE device SET deviceName = ?, deviceType = ? WHERE deviceId = ?";
    const [result] = await connection.execute(updateStatement, [deviceName, deviceType, deviceId]);
    if (result.affectedRows === 0) {
      return new Error("Device update failed");
    }
  } catch (error) {
    console.error("设备信息更新失败:", error);
    throw error;
  }
}

// 为设备选择产品
async function selectProduct(deviceId, productId) {
  const statement = "INSERT INTO device_product (deviceId, productId) VALUES (?, ?)";
  try {
    const [result] = await connection.execute(statement, [deviceId, productId]);

    if (result.affectedRows < 0) {
      throw new Error("Product selection failed");
    }
    return result.insertId;
  } catch (error) {
    console.error("Error selecting product for device:", error);
    throw error;
  }
}

// 修改设备当前状态
async function changeDeviceStatus(userId, deviceId) {
  try {
    const curStatus = await getDeviceStatus(userId, deviceId);
    const newStatus = curStatus === 0 ? 1 : 0;
    const [result] = await connection.execute("UPDATE device SET deviceStatus = ? WHERE userId = ? AND deviceId = ?", [
      newStatus,
      userId,
      deviceId,
    ]);

    if (result.affectedRows < 0) {
      throw new Error("Status change failed");
    }
    return result.insertId;
  } catch (error) {
    console.error("Error updating device status:", error);
    throw error;
  }
}

module.exports = {
  getDeviceList,
  getDeviceInfo,
  addDevice,
  deleteDevice,
  updateDeviceInfo,
  selectProduct,
};
