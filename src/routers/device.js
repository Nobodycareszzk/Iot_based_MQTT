// 设备控制路由
const express = require("express");
const {
  getDeviceInfo,
  deleteDeviceInfo,
  getDeviceCurStatus,
  updateDeviceInfo,
  addDeviceInfo,
  changeDeviceCurStatus,
  getAllDevicesInfo,
} = require("../controllers/devicesController");

const deviceRouter = express.Router();

deviceRouter.get("/:userId/search", getAllDevicesInfo);
deviceRouter.get("/:userId/search/:deviceId", getDeviceInfo);
deviceRouter.get("/:userId/status/:deviceId", getDeviceCurStatus);
deviceRouter.post("/delete", deleteDeviceInfo);
deviceRouter.post("/update", updateDeviceInfo);
deviceRouter.post("/add", addDeviceInfo);
deviceRouter.post("/logchange", changeDeviceCurStatus);

module.exports = deviceRouter;
