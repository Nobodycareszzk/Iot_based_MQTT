const connection = require("../utils/databaseConnect");

async function addData(deviceId, data) {
  const createTime =
    new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
  const statement =
    "INSERT INTO devicedata (deviceId, data, createTime) VALUES (?, ?, ?)";
  try {
    const [result] = await connection.execute(statement, [
      deviceId,
      data,
      createTime,
    ]);
    if (result.affectedRows === 0) {
      throw new Error("Data insert failed");
    }
    return result;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
}

async function showData(deviceId) {
  try {
    const [result] = await connection.execute(
      "SELECT * FROM devicedata WHERE deviceId = ?",
      [deviceId]
    );
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

module.exports = {
  addData,
  showData,
};
