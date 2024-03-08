const mqtt = require("mqtt");

const url = "mqtt://localhost:1883";
const options = {
  clientId: "test1",
};

// 连接到本地 MQTT 服务器
const client = mqtt.connect(url, options);

// 监听连接事件
client.on("connect", () => {
  console.log("Connected to MQTT server");

  // 订阅一个主题
  client.subscribe("test2/topic", (err) => {
    if (!err) {
      console.log("test1 订阅test2/topic成功");
    }
  });

  client.subscribe("$SYS/ZZK/new/#", (err) => {
    if (!err) {
      console.log("test1 订阅$SYS/ZZK/new/#成功");
    }
  });
});

// 监听消息到达事件
client.on("message", (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
});

module.exports = client;
