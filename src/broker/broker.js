const mosca = require("mosca");

const MqttServer = new mosca.Server({
  port: 1883,
  id: "ZZK",
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
  console.log(
    `Published: topic: ${packet.topic} || message: ${packet.payload.toString()}`
  );
});

// 监听 Mosca 服务器就绪事件
MqttServer.on("ready", () => {
  console.log("Mosca server is up and running");
});
