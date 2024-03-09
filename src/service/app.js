const express = require("express");
const mqtt = require("mqtt");

const app = express();

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const client = mqtt.connect("mqtt://localhost:9000", { clientId: id });
  client.publish("res/test", "hello world", (err) => {
    if (err) {
      res.sendStatus(500);
      client.end();
    }
  });
  client.subscribe("req/test", (err) => {
    if (err) {
      res.sendStatus(502);
      client.end();
    }
  });
  client.on("message", (topic, message) => {
    console.log(topic, message.toString());
    res.send(message.toString());
    client.end();
  });
});

app.post("/post", (req, res) => {
  console.log(req);
  res.send("Hello, World!");
});

// app.use("/devices", deviceRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
