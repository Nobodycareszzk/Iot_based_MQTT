const sendMQTT = require("../utils/sendMQTT");

async function controlDevcie(req, res, next) {
  const { userId, deviceId, message } = req.body;
  const pubTopic = `publish/${userId}/${deviceId}`;
  const subTopic = `subscribe/${userId}/${deviceId}`;
  await sendMQTT(pubTopic, subTopic, message, res, userId);
}

module.exports = { controlDevcie };
