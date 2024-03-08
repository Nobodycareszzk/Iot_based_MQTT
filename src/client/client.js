const mqtt = require("mqtt");
const config = require("../config/config");

// 连接到本地 MQTT 服务器
const client = mqtt.connect(config.URL, config.SERVICE_OPTIONS);

// 监听连接事件
client.on("connect", () => {
  console.log("Service Connected to MQTT broker");
  // 订阅系统默认的主题
  client.subscribe("$SYS/ZZK/#", (err) => {
    if (!err) {
      console.log("Service 订阅$SYS/ZZK/#成功");
    }
  });
  // 订阅其他主题

  // 监听消息到达事件
  client.on("message", (topic, message) => {
    if (topic.startsWith("$SYS/ZZK/")) {
      handleSystemMessage(topic, message);
    } else {
      // other function
    }
  });
});

function handleSystemMessage(topic, message) {
  console.log(`Received System Message ${topic}: ${message.toString()}`);
}

module.exports = client;
