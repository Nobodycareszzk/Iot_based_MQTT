const mqtt = require("mqtt");

// 有问题的代码（对象会被销毁）
class MQTTClient {
  constructor(url, options, customOnMessage) {
    this.client = mqtt.connect(url, options);
    this.client.on("connect", () => {
      console.log("Client connected to MQTT broker");
    });
    this.client.on("message", this.onMessage);
    this.customOnMessage = customOnMessage; // 存储自定义的方法
  }

  subscribe(topic) {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(`Failed to subscribe to ${topic}:`, err);
      } else {
        console.log(`Subscribed to ${topic}`);
      }
    });
  }

  publish(topic, message) {
    this.client.publish(topic, message, (err) => {
      if (err) {
        console.error(`Failed to publish message to ${topic}:`, err);
      } else {
        console.log(`Published message to ${topic}: ${message}`);
      }
    });
  }

  onMessage = (topic, message) => {
    console.log(`Received message on ${topic}: ${message.toString()}`);
    if (typeof this.customOnMessage === "function") {
      // 如果自定义方法存在，则调用自定义方法
      this.customOnMessage(topic, message);
    }
  };

  close() {
    this.client.end();
  }
}

module.exports = MQTTClient;
