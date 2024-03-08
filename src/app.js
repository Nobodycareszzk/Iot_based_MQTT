const express = require("express");

const app = express();

app.get("/get", (req, res) => {
  console.log(1);
  res.send("Hello, World!");
});

app.post("/post", (req, res) => {
  console.log(req);
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
