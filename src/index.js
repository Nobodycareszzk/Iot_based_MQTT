// webSocket
const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: true,
});

const existingNamespaces = {}; // 存储已存在的命名空间

io.on("connection", (socket) => {
  console.log("客户端已连接");

  socket.on("createNamespace", (namespaceName) => {
    console.log("正在创建/获取命名空间:", namespaceName);
    if (existingNamespaces[namespaceName]) {
      socket.emit("namespaceCreated_socket", namespaceName); // 通知客户端命名空间已创建
      console.log("命名空间已存在，重用:", namespaceName);
    } else {
      const nsp = io.of(namespaceName);
      nsp.on("connection", (socket) => {
        console.log(`someone connected ${namespaceName}`);
        setInterval(() => {
          socket.emit("intervalMessage", `This is a periodic message from the server_from${namespaceName}`);
        }, 5000); // 每隔5秒发送一次消息
      });
      console.log("创建新的命名空间:", namespaceName);
      socket.emit("namespaceExists", namespaceName); // 通知客户端命名空间已创建
      console.log("命名空间已创建事件已发送:", namespaceName); // 添加的日志
    }
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`服务器已启动，正在监听端口 ${PORT}`);
});
