const userClient = require("mqtt").connect("mqtt://localhost:9000", {
  clientId: "userClient",
});

async function controlDevcie(req, res, next) {
  const { userId, deviceId, message } = req.body;

  // 定义 MQTT 客户端消息监听回调函数
  function messageListener(topic, receivedMessage) {
    if (topic === `subscribe/${userId}/${deviceId}`) {
      console.log("Service 收到信息", receivedMessage.toString());

      // 发送 HTTP 响应
      res.json({
        code: 200,
        message: "操作成功",
        data: receivedMessage.toString(),
      });

      // 取消订阅消息
      userClient.unsubscribe(`subscribe/${userId}/${deviceId}`);

      // 移除消息监听器，避免重复处理
      userClient.removeListener("message", messageListener);
    }
  }

  // 订阅消息
  userClient.subscribe(`subscribe/${userId}/${deviceId}`, (err) => {
    if (err) {
      return res.sendStatus(502);
    }
    // 成功订阅后，添加消息监听器
    userClient.on("message", messageListener);
  });

  // 发布消息
  userClient.publish(`publish/${userId}/${deviceId}`, message, (err) => {
    if (err) {
      return res.sendStatus(500);
    }
  });
}

module.exports = { controlDevcie };
