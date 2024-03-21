const mqtt = require("mqtt");
const config = require("../config/config");

// 连接到本地 MQTT 服务器
const serviceClient = mqtt.connect(config.URL, config.SERVICE_OPTIONS);

function subscribeToTopic(client, ...topics) {
  topics.forEach((topic) => {
    client?.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Service 订阅${topic}成功`);
      }
    });
  });
}

// 监听连接事件
serviceClient.on("connect", () => {
  console.log("Service Connected to MQTT broker");
  // 订阅系统默认的主题 用于测试
  subscribeToTopic(serviceClient, "$SYS/ZZK/#");

  // 监听消息到达事件
  serviceClient.on("message", (topic, message) => {
    if (topic.startsWith("$SYS/ZZK/")) {
      handleSystemMessage(topic, message);
    } else {
      console.log(`Received Message ${topic}: ${message.toString()}`);
    }
  });
});

function handleSystemMessage(topic, message) {
  console.log(`Received System Message ${topic}: ${message.toString()}`);
}
