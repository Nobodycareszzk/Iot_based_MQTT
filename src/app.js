const express = require("express");
const loginRouter = require("./routers/login");
const userRouter = require("./routers/user");
const deviceRouter = require("./routers/device");
const topicRouter = require("./routers/topic");
const groupRouter = require("./routers/group");
const communicateRouter = require("./routers/communicate");
const menuRouter = require("./routers/menu");
const permissionRouter = require("./routers/permission");
// 导入的时候所有代码都会被执行一次
// require("./broker/broker");
// require("./client/client");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(loginRouter);
// app.use("/user", userRouter);
app.use("/device", deviceRouter);
app.use(menuRouter);
app.use(permissionRouter);
// app.use("/topic", topicRouter);
// app.use("/group", groupRouter);
// app.use("/communicate", communicateRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
