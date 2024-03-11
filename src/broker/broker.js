const mosca = require("mosca");
const config = require("../config/config");

const MqttServer = new mosca.Server({
  port: config.MQTT_PORT,
  id: config.BROKER_ID,
});

// 监听客户端连接事件
MqttServer.on("clientConnected", (client) => {
  console.log(`Client connected: ${client.id}`);
});

// 监听客户端断开事件
MqttServer.on("clientDisconnected", (client) => {
  console.log(`Client disconnected: ${client.id}`);
});

// 监听 MQTT 消息发布事件
MqttServer.on("published", (packet, client) => {
  if (packet.topic.startsWith("$SYS/ZZK/")) {
    return;
  }
  console.log(
    `Published: ${packet.topic} ||  ${packet.payload.toString()} ${
      client ? "from " + client.id : "no client info"
    }`
  );
});

// 监听 Mosca 服务器就绪事件
MqttServer.on("ready", () => {
  console.log("Mosca server is up and running");
});
