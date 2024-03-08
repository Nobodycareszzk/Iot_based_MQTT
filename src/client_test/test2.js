const mqtt = require("mqtt");

const url = "mqtt://localhost:1883";
const options = {
  clientId: "test2",
};

// 连接到本地 MQTT 服务器
const client = mqtt.connect(url, options);

client.on("connect", () => {
  // 订阅一个主题
  client.subscribe("test1/topic", (err) => {
    if (!err) {
      console.log("test2 订阅test1/topic成功");
    }
  });

  console.log("Connected to Mosca server");
  setInterval(() => {
    client.publish("test2/topic", "This is test2 publish");
    console.log("Message sent to test2/topic");
  }, 10000); // 10 秒
});
