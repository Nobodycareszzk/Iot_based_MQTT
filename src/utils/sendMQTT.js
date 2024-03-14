const mqtt = require("mqtt");
const createResBody = require("./resBody");

// 用于发送MQTT请求并获取信息后传递给客户端
async function sendMQTT(pubTopic, subTopic, message, res, userId) {
  const client = mqtt.connect("mqtt://localhost:9000", { clientId: userId });
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
      console.log("Service 收到信息", message.toString());
      res.json(createResBody(200, "操作成功", message.toString()));
    }
    client.end();
  });
}

module.exports = sendMQTT;
