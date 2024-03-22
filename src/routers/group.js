const express = require("express");
const {
  addGroupInfo,
  deleteGroupInfo,
  getAllGroupsInfo,
  addDeviceInGroup,
  removeDeviceOutGroup,
  getAllDevicesInGroupInfo,
} = require("../controllers/groupController");

const groupRouter = express.Router();

groupRouter.post("/add", addGroupInfo);
groupRouter.post("/delete", deleteGroupInfo);
groupRouter.get("/search", getAllGroupsInfo);
groupRouter.post("/addDevice", addDeviceInGroup);
groupRouter.post("/removeDevice", removeDeviceOutGroup);
groupRouter.get("/search/:groupId", getAllDevicesInGroupInfo);

module.exports = groupRouter;
