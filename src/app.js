const express = require("express");
const loginRouter = require("./routers/login");
const userRouter = require("./routers/user");

const app = express();
app.use(express.json());
app.use(loginRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
