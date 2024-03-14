const mqtt = require("mqtt");
const config = require("../config/config");

const deviceClientConfig = {
  clientId: "device",
};

// 连接到本地 MQTT 服务器
const MQTTclient = mqtt.connect(config.URL, deviceClientConfig);

function subscribeToTopic(client, ...topics) {
  topics.forEach((topic) => {
    client?.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Service 订阅${topic}成功`);
      }
    });
  });
}
let count = 0;

// 监听连接事件
MQTTclient.on("connect", () => {
  console.log("Service Connected to MQTT broker");
  // 订阅系统默认的主题 用于测试
  subscribeToTopic(MQTTclient, "/publish/1/1/control");
  MQTTclient.on("message", (topic, message) => {
    if (topic === "/publish/1/1/control") {
      console.log("设备收到信息", message.toString());
      MQTTclient.publish(
        "/subscribe/1/1/control",
        `这是设备发出去的消息-${count++}`,
        (err) => {
          if (err) {
            console.log("设备发送信息失败");
          }
        }
      );
    }
  });
});
