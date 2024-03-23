const createResBody = require("../utils/resBody");
const {
  getDeviceList,
  getDeviceInfo,
  addDevice,
  deleteDevice,
  updateDeviceInfo,
  selectProduct,
} = require("../service/deviceService");

const { showData } = require("../service/dataService");

async function getDeviceListInfo(req, res, next) {
  const userId = res.locals.user.id;
  try {
    const result = await getDeviceList(userId);
    const data = { devices: result, total: result.length };
    res.json(createResBody(2000, "获取成功", data));
  } catch (error) {
    res.json(createResBody(-2002, "获取失败", error));
  }
}

async function addDeviceByName(req, res, next) {
  const { deviceName, deviceType } = req.body;
  const userId = res.locals.user.id;
  try {
    const result = await addDevice(userId, deviceName, deviceType);
    console.log("addDeviceInfo", result);
    const data = { deviceId: result };
    res.json(createResBody(2000, "添加成功", data));
  } catch (error) {
    res.json(createResBody(-2003, "添加失败", error));
  }
}

async function getDeviceInfoById(req, res, next) {
  const { deviceId } = req.params;

  try {
    const result = await getDeviceInfo(deviceId);
    console.log("getDeviceInfo", result);
    res.json(createResBody(2000, "获取成功", result));
  } catch (error) {
    res.json(createResBody(-2002, "获取失败", error));
  }
}

async function deleteDeviceInfoById(req, res, next) {
  const { deviceId } = req.params;
  const userId = res.locals.user.id;
  try {
    await deleteDevice(userId, deviceId);

    const data = { deviceId: deviceId };
    res.json(createResBody(2000, "删除成功", data));
  } catch (error) {
    console.log("deleteDeviceInfo", error);
    res.json(createResBody(-2004, "删除失败", error));
  }
}

async function updateDeviceInfoById(req, res, next) {
  const { deviceId, deviceName, deviceType } = req.body;

  try {
    await updateDeviceInfo(deviceId, deviceName, deviceType);
    const data = { deviceId: deviceId, deviceName: deviceName, deviceType: deviceType };
    res.json(createResBody(2000, "更新成功", data));
  } catch (error) {
    res.json(createResBody(-2005, "更新失败", error));
  }
}

async function selectProductForDeviceById(req, res, next) {
  const { deviceId, productId } = req.body;
  try {
    const result = await selectProduct(deviceId, productId);
    console.log("selectProduct", result);
    const data = { deviceId: deviceId, productId: productId };
    res.json(createResBody(2000, "添加成功", data));
  } catch (error) {
    res.json(createResBody(-2001, "添加失败", error));
  }
}

// async function getDeviceCurStatus(req, res, next) {
//   const { userId, deviceId } = req.params;
//   try {
//     const result = await getDeviceStatus(userId, deviceId);
//     console.log("getDeviceCurStatus", result);
//     res.json(createResBody(2000, "获取成功", result));
//   } catch (error) {
//     res.json(createResBody(-2001, "获取失败", error));
//   }
// }

// async function changeDeviceCurStatus(req, res, next) {
//   const { userId, deviceId } = req.body;
//   try {
//     const result = await changeDeviceStatus(userId, deviceId);
//     console.log("changeDeviceCurStatus", result);
//     res.json(createResBody(2000, "更新成功", result));
//   } catch (error) {
//     res.json(createResBody(-2001, "更新失败", error));
//   }
// }

// async function getDeviceData(req, res, next) {
//   const { deviceId } = req.params;
//   try {
//     const result = await showData(deviceId);
//     res.json(createResBody(2000, "获取成功", result));
//   } catch (error) {
//     res.json(createResBody(-2001, "获取失败", error));
//   }
// }

module.exports = {
  getDeviceListInfo,
  addDeviceByName,
  getDeviceInfoById,
  deleteDeviceInfoById,
  updateDeviceInfoById,
  selectProductForDeviceById,
};
