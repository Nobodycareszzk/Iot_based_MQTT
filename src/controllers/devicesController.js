const createResBody = require("../utils/resBody");
const {
  getDevice,
  updateDevice,
  deleteDevice,
  addDevice,
  getDeviceStatus,
  changeDeviceStatus,
  getAllDevices,
} = require("../service/deviceService");

async function getDeviceInfo(req, res, next) {
  const { userId, deviceId } = req.params;
  try {
    const result = await getDevice(userId, deviceId);
    console.log("getDeviceInfo", result);
    res.json(result);
  } catch (error) {
    res.json(createResBody(-2001, "获取失败", error));
  }
}

async function deleteDeviceInfo(req, res, next) {
  const { userId, deviceId } = req.body;
  try {
    const result = await deleteDevice(userId, deviceId);
    console.log("deleteDeviceInfo", result);
    res.json(createResBody(2000, "删除成功"));
  } catch (error) {
    res.json(createResBody(-2001, "删除失败", error));
  }
}

async function addDeviceInfo(req, res, next) {
  const { userId, deviceName, productId } = req.body;
  try {
    const result = await addDevice(userId, deviceName, productId);
    console.log("addDeviceInfo", result);
    res.json(createResBody(2000, "添加成功", result));
  } catch (error) {
    res.json(createResBody(-2001, "添加失败", error));
  }
}

async function updateDeviceInfo(req, res, next) {
  const { userId, deviceId, deviceName, productId } = req.body;
  try {
    const result = await updateDevice(userId, deviceId, deviceName, productId);
    console.log("updateDeviceInfo", result);
    res.json(createResBody(2000, "更新成功", result));
  } catch (error) {
    res.json(createResBody(-2001, "更新失败", error));
  }
}

async function getDeviceCurStatus(req, res, next) {
  const { userId, deviceId } = req.params;
  try {
    const result = await getDeviceStatus(userId, deviceId);
    console.log("getDeviceCurStatus", result);
    res.json(createResBody(2000, "获取成功", result));
  } catch (error) {
    res.json(createResBody(-2001, "获取失败", error));
  }
}

async function changeDeviceCurStatus(req, res, next) {
  const { userId, deviceId } = req.body;
  try {
    const result = await changeDeviceStatus(userId, deviceId);
    console.log("changeDeviceCurStatus", result);
    res.json(createResBody(2000, "更新成功", result));
  } catch (error) {
    res.json(createResBody(-2001, "更新失败", error));
  }
}

async function getAllDevicesInfo(req, res, next) {
  const { userId } = req.params;
  try {
    const result = await getAllDevices(userId);
    res.json(createResBody(2000, "获取成功", result));
  } catch (error) {
    res.json(createResBody(-2001, "获取失败", error));
  }
}

module.exports = {
  getDeviceInfo,
  deleteDeviceInfo,
  getDeviceCurStatus,
  updateDeviceInfo,
  addDeviceInfo,
  changeDeviceCurStatus,
  getAllDevicesInfo,
};
