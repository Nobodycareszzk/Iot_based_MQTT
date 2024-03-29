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

  socket.on("createNamespace", (nspName) => {
    let nsp = null;
    if (existingNamespaces[nspName]) {
      // 获取已存在的命名空间
      nsp = io.of(nspName);
      socket.emit("connect_nsp", nspName); // 通知客户端连接命名空间
    } else {
      // 创建新的命名空间
      nsp = io.of(nspName);
      existingNamespaces[nspName] = nsp;
      socket.emit("connect_nsp", nspName); // 通知客户端连接命名空间
    }
    nsp.on("connection", (socket) => {
      console.log(`someone connected ${nspName}`);
      setInterval(() => {
        socket.emit("intervalMessage", `This is a periodic message from the server_from${nspName}`);
      }, 5000); // 每隔5秒发送一次消息
    });
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`服务器已启动，正在监听端口 ${PORT}`);
});
