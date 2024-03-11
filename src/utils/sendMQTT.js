const mqtt = require("mqtt");

// 用于发送MQTT请求并获取信息后传递给客户端
function sendMQTT(pubTopic, subTopic, message, res) {
  const client = mqtt.connect("mqtt://localhost:9000", { clientId: id });
  client.publish(pubTopic, message, (err) => {
    if (err) {
      res.sendStatus(500);
      client.end();
    }
  });
  client.subscribe(subTopic, (err) => {
    if (err) {
      res.sendStatus(502);
      client.end();
    }
  });
  client.on("message", (topic, message) => {
    if (topic === subTopic) {
      res.json(message);
    }
    client.end();
  });
}

module.exports = sendMQTT;
