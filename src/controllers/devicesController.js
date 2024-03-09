function devicesControl(res, req, next) {
  const userId = req.params.userId;
  const action = req.params.action;
  const deviceId = req.params.deviceId;

  res.send("Control Success");
}

async function getDeviceStatus(userId, action, deviceId) {
  const topic = `/${userId}/${action}/${deviceId}`;
  const res = await publishMessage(topic, "1");
  return res;
}

async function publishMessage(topic, message) {}

module.exports = {
  devicesControl,
  publishMessage,
};
