const express = require("express");
const {
  addTopicInfo,
  deleteTopicInfo,
  getAllTopicsInfo,
  addTopicForDevice,
  removeTopicForDevice,
  getDeviceTopicsInfo,
} = require("../controllers/topicController");

const topicRouter = express.Router();

topicRouter.post("/add", addTopicInfo);
topicRouter.delete("/delete/topicId:", deleteTopicInfo);
topicRouter.get("/search", getAllTopicsInfo);
topicRouter.post("/addDevice", addTopicForDevice);
topicRouter.post("/removeDevice", removeTopicForDevice);
topicRouter.get("/search/:deviceId", getDeviceTopicsInfo);

module.exports = topicRouter;
