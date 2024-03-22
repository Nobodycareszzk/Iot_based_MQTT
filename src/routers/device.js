// 设备控制路由
const express = require("express");
const {
  getDeviceListInfo,
  addDeviceByName,
  getDeviceInfoById,
  deleteDeviceInfoById,
  updateDeviceInfoById,
  selectProductForDeviceById,
} = require("../controllers/devicesController");

const { verifyToken } = require("../middleware/loginMiddleware");
const { hasDevice } = require("../middleware/deviceMiddlware");

const deviceRouter = express.Router();

const deviceMiddleware = [verifyToken, hasDevice];

deviceRouter.get("/search/list", verifyToken, getDeviceListInfo);
deviceRouter.post("/add", verifyToken, addDeviceByName);
deviceRouter.get("/search/:deviceId", deviceMiddleware, getDeviceInfoById);
deviceRouter.delete("/delete/:deviceId", deviceMiddleware, deleteDeviceInfoById);
deviceRouter.post("/update/", deviceMiddleware, updateDeviceInfoById);
deviceRouter.post("/select", deviceMiddleware, selectProductForDeviceById);

// deviceRouter.get("/:userId/status/:deviceId", getDeviceCurStatus);

// deviceRouter.post("/logchange", changeDeviceCurStatus);
// deviceRouter.get("/data/:deviceId", getDeviceData);

module.exports = deviceRouter;
