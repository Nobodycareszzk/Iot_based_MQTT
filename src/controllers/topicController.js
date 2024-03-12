const createResBody = require("../utils/resBody");

const {
  addTopic,
  deleteTopic,
  getAllTopics,
  removeTopicOutDevice,
  addTopicInDevice,
  getDeviceTopics,
} = require("../service/topicService");

async function addTopicInfo(req, res, next) {
  const { userId, topic } = req.body;
  try {
    const result = await addTopic(userId, topic);
    console.log("addTopicInfo", result);
    res.json(createResBody(2000, "主题添加成功", result));
  } catch (error) {
    res.json(createResBody(-2001, "主题添加失败", error));
  }
}

async function deleteTopicInfo(req, res, next) {
  const { userId, topic } = req.body;
  try {
    const result = await deleteTopic(userId, topic);
    console.log("deleteTopicInfo", result);
    res.json(createResBody(2000, "主题删除成功"));
  } catch (error) {
    res.json(createResBody(-2001, "主题删除失败", error));
  }
}

async function getAllTopicsInfo(req, res, next) {
  const { userId } = req.params;
  try {
    const result = await getAllTopics(userId);
    console.log("getAllTopicsInfo", result);
    res.json(createResBody(2000, "主题信息获取成功", result));
  } catch (error) {
    res.json(createResBody(-2001, "获取失败", error));
  }
}

async function addTopicForDevice(req, res, next) {
  const { deviceId, topic } = req.body;
  try {
    const result = await addTopicInDevice(deviceId, topic);
    console.log("addTopicForDevice", result);
    res.json(createResBody(2000, "主题添加成功", result));
  } catch (error) {
    res.json(createResBody(-2001, "主题添加失败", error));
  }
}

async function removeTopicForDevice(req, res, next) {
  const { deviceId, topic } = req.body;
  try {
    const result = await removeTopicOutDevice(deviceId, topic);
    console.log("removeTopicForDevice", result);
    res.json(createResBody(2000, "主题删除成功"));
  } catch (error) {
    res.json(createResBody(-2001, "主题删除失败", error));
  }
}

async function getDeviceTopicsInfo(req, res, next) {
  const { deviceId } = req.params;
  try {
    const result = await getDeviceTopics(deviceId);
    console.log("getDeviceTopicsInfo", result);
    res.json(createResBody(2000, "主题信息获取成功", result));
  } catch (error) {
    res.json(createResBody(-2001, "获取失败", error));
  }
}

module.exports = {
  addTopicInfo,
  deleteTopicInfo,
  getAllTopicsInfo,
  addTopicForDevice,
  removeTopicForDevice,
  getDeviceTopicsInfo,
};
