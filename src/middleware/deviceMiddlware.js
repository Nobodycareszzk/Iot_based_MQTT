const connection = require("../utils/databaseConnect");
const createResBody = require("../utils/resBody");

const hasDevice = async (req, res, next) => {
  const userId = res.locals.user.id;
  const deviceId = req.params.deviceId === undefined ? req.body.deviceId : req.params.deviceId;
  const statement = "SELECT * FROM user_device WHERE userId = ? AND deviceId = ?";
  try {
    const [result] = await connection.execute(statement, [userId, deviceId]);
    if (result.length === 0) {
      throw new Error("Device not found");
    }
    next();
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.json(createResBody(-2001, "用户无此设备", error));
  }
};
module.exports = { hasDevice };
