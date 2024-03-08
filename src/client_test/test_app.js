// 使用 Map 缓存控制设备的请求和对应的响应对象
const controlDeviceRequests = new Map();

// 处理用户请求获取设备温度信息
app.post("/control-device", async (req, res) => {
  const { deviceId, action } = req.body;

  // 将请求和响应对象存入缓存
  controlDeviceRequests.set(deviceId, res);

  // 向设备发送控制指令
  mqttClient.publish(
    `/devices/${deviceId}/control`,
    JSON.stringify({ action }),
    (err) => {
      if (err) {
        console.error("发送消息失败:", err);
        // 如果发送消息失败，从缓存中删除对应的响应对象
        controlDeviceRequests.delete(deviceId);
      } else {
        console.log("消息发送成功");
      }
    }
  );
});

function handleControlSuccess(topic) {
  // 根据不同的主题判断是否需要执行相应的处理逻辑
  if (topic.startsWith("/devices/") && topic.endsWith("/control-success")) {
    // 获取设备的 deviceId
    const deviceId = topic.split("/")[2];
    // 查找对应的响应对象
    const res = controlDeviceRequests.get(deviceId);
    controlDeviceRequests.set(deviceId, res);
    setTimeout(() => {
      if (controlDeviceRequests.has(deviceId)) {
        console.error("请求超时:", deviceId);
        // 如果超时，从缓存中删除对应的请求和响应对象
        controlDeviceRequests.delete(deviceId);
        res.sendStatus(500);
      }
    }, 30000);
    if (res) {
      // 删除缓存中的请求和响应对象
      controlDeviceRequests.delete(deviceId);
      // 设备控制成功，返回状态码200给前端用户
      res.sendStatus(200);
    }
  }
}
// 处理设备发送的控制成功消息
mqttClient.on("message", (topic, message) => {
  handleControlSuccess(topic);
  // 如果有其他主题也需要处理，可以在这里添加相应的处理逻辑
});
