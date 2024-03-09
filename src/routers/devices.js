// 设备控制路由
const express = require("express");
// const { devicesControl } = require("../controllers/devicesController");

const deviceRouter = express.Router();

// 控制设备
// deviceRouter.get("/control/:userId/:action/:deviceId", (req, res, next) => {
//   const userId = req.params.userId;
//   const action = req.params.action;
//   const deviceId = req.params.deviceId;

//   const topic = `/${userId}/${action}/${deviceId}`;
// });

deviceRouter.get("/control", (req, res, next) => {
  mqttClient.publish("/devices/1/control", "1", (err) => {
    if (err) {
      console.error("发送消息失败:", err);
      res.sendStatus(500);
    } else {
      console.log("消息发送成功");
      MqttClient.subscribe("/devices/1/control-success", (err) => {
        if (!err) {
          console.log("Service 订阅/devices/1/control-success成功");
        }
      });
      res.sendStatus(200);
    }
  });
});

module.exports = deviceRouter;
