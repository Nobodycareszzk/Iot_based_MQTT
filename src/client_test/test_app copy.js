// 使用 Map 缓存控制设备的请求和对应的响应对象
const controlDeviceRequests = new Map();

// 处理用户请求获取设备温度信息
app.post("/control-device", async (req, res) => {
  const { deviceId, action } = req.body;
  res = await handleControlSuccess();
  return res;
});

function handleControlSuccess() {
  // 连接broker
  client.connect();
  // 订阅主题

  //收到消息
  client.on("message", (topic, message) => {
    return message;
  });
}
// 处理设备发送的控制成功消息
mqttClient.on("message", (topic, message) => {
  handleControlSuccess(topic);
  // 如果有其他主题也需要处理，可以在这里添加相应的处理逻辑
});
