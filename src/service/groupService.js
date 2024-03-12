const connection = require("../utils/databaseConnect");

async function addGroup(userId, groupName) {
  const statement = "INSERT INTO grouplist (groupName, userId) VALUES (?, ?)";
  try {
    const [result] = await connection.execute(statement, [groupName, userId]);
    if (result.affectedRows === 0) {
      throw new Error("Group insert failed");
    }
    return result.insertId;
  } catch (error) {
    console.error("Error adding group:", error);
    throw error;
  }
}

async function deleteGroup(userId, groupId) {
  const statement = "DELETE FROM grouplist WHERE groupId = ? AND userId = ?";
  try {
    const [result] = await connection.execute(statement, [groupId, userId]);
    if (result.affectedRows === 0) {
      throw new Error("Group not found");
    }
    return result.affectedRows;
  } catch (error) {
    console.error("Error deleting group:", error);
    throw error;
  }
}

async function getAllGroups(userId) {
  const statement = "SELECT * FROM grouplist WHERE userId = ?";
  try {
    const [result] = await connection.execute(statement, [userId]);
    return result;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
}

async function addDeviceIn(deviceId, groupId, groupName) {
  const statement =
    "INSERT INTO groupinfo (deviceId, groupId, groupName) VALUES (?, ?, ?)";
  try {
    const [result] = await connection.execute(statement, [
      deviceId,
      groupId,
      groupName,
    ]);
    if (result.affectedRows === 0) {
      throw new Error("GroupDevice insert failed");
    }
    return result.insertId;
  } catch (error) {
    console.error("Error adding groupDevice:", error);
    throw error;
  }
}

async function removeDeviceOut(deviceId, groupId) {
  const statement = "DELETE FROM groupinfo WHERE deviceId = ? AND groupId = ?";
  try {
    const [result] = await connection.execute(statement, [deviceId, groupId]);
    if (result.affectedRows === 0) {
      throw new Error("GroupDevice not found");
    }
    return result.affectedRows;
  } catch (error) {
    console.error("Error deleting groupDevice:", error);
    throw error;
  }
}

async function getAllDevicesInGroup(groupId) {
  const statement = "SELECT * FROM groupinfo WHERE groupId = ?";
  try {
    const [result] = await connection.execute(statement, [groupId]);
    return result;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
}

module.exports = {
  addGroup,
  deleteGroup,
  getAllGroups,
  addDeviceIn,
  removeDeviceOut,
  getAllDevicesInGroup,
};
