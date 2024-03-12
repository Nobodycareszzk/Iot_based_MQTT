const express = require("express");
const {
  addTopicInfo,
  deleteTopicInfo,
  getAllTopicsInfo,
} = require("../controllers/topicController");

const topicRouter = express.Router();

topicRouter.post("/add", addTopicInfo);
topicRouter.post("/delete", deleteTopicInfo);
topicRouter.get("/:userId/search", getAllTopicsInfo);

module.exports = topicRouter;
