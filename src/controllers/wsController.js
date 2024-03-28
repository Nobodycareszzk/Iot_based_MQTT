const io = require("../app");

const existingNamespaces = {}; // 存储已存在的命名空间

io.on("connection", (socket) => {
  console.log("客户端已连接");

  socket.on("createNamespace", (namespaceName) => {
    console.log("正在创建/获取命名空间:", namespaceName);

    if (existingNamespaces[namespaceName]) {
      console.log("命名空间已存在，重用:", namespaceName);
      socket.join(namespaceName); // 将客户端加入到已存在的命名空间中
    } else {
      console.log("创建新的命名空间:", namespaceName);
      const namespace = io.of(namespaceName);
      existingNamespaces[namespaceName] = true;
      socket.join(namespaceName); // 将客户端加入到新创建的命名空间中
    }
  });
});
