const express = require("express");
const app = express();

const loginRouter = require("./routers/login");
const userRouter = require("./routers/user");
const deviceRouter = require("./routers/device");
const topicRouter = require("./routers/topic");
const groupRouter = require("./routers/group");
const communicateRouter = require("./routers/communicate");
const menuRouter = require("./routers/menu");
const permissionRouter = require("./routers/permission");
const productRouter = require("./routers/product");

// 导入的时候所有代码都会被执行一次
require("./broker/broker");
// require("./client/client");

app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use(express.json());
app.use(loginRouter);
app.use("/user", userRouter);
app.use("/device", deviceRouter);
app.use("/product", productRouter);
app.use(menuRouter);
app.use(permissionRouter);
// app.use("/topic", topicRouter);
// app.use("/group", groupRouter);
app.use("/communicate", communicateRouter);

module.exports = app;
