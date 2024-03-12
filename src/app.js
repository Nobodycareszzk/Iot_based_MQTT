const express = require("express");
const loginRouter = require("./routers/login");
const userRouter = require("./routers/user");
const deviceRouter = require("./routers/device");
const topicRouter = require("./routers/topic");
const groupRouter = require("./routers/group");

const app = express();
app.use(express.json());
app.use(loginRouter);
app.use("/user", userRouter);
app.use("/device", deviceRouter);
app.use("/topic", topicRouter);
app.use("/group", groupRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
