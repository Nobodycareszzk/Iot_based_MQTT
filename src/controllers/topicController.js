const createResBody = require("../utils/resBody");

const {
  addTopic,
  deleteTopic,
  getAllTopics,
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

module.exports = {
  addTopicInfo,
  deleteTopicInfo,
  getAllTopicsInfo,
};
