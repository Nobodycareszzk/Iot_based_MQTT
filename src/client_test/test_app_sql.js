function handleControlSuccess(topic, message) {
  // 根据不同的主题判断是否需要执行相应的处理逻辑
  if (topic.startsWith("/devices/") && topic.endsWith("/control-success")) {
    // 获取设备的 deviceId
    const deviceId = topic.split("/")[2];
    // 查找对应的响应对象
    const res = controlDeviceRequests.get(deviceId);
    if (res) {
      // 删除缓存中的请求和响应对象
      controlDeviceRequests.delete(deviceId);
      // 设备控制成功，返回状态码200给前端用户
      res.sendStatus(200);

      // 存入数据库
      saveMessageToDatabase(deviceId, message);
    }
  }
}

async function saveMessageToDatabase(deviceId, message) {
  try {
    // 这里使用 await 等待数据库存储操作完成
    await YourDatabaseModel.create({
      deviceId: deviceId,
      message: message.toString(), // 假设 message 是 Buffer 类型，转换为字符串存入数据库
    });
    console.log("消息存入数据库成功");
  } catch (error) {
    console.error("存入数据库失败:", error);
  }
}

// 处理设备发送的控制成功消息
mqttClient.on("message", (topic, message) => {
  handleControlSuccess(topic, message);
  // 如果有其他主题也需要处理，可以在这里添加相应的处理逻辑
});

function handleTimeout(deviceId) {
  if (controlDeviceRequests.has(deviceId)) {
    console.error("请求超时:", deviceId);
    // 如果超时，从缓存中删除对应的请求和响应对象
    controlDeviceRequests.delete(deviceId);
    res.sendStatus(500); // 这里可能需要修改，根据您的实际情况返回适当的响应码
  }
}

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
        res.sendStatus(500); // 这里可能需要修改，根据您的实际情况返回适当的响应码
      } else {
        console.log("消息发送成功");
        setTimeout(() => {
          handleTimeout(deviceId);
        }, 30000);
      }
    }
  );
});
