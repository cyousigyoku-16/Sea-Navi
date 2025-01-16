const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });
const clients = new Map();

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const data = JSON.parse(message);

        // 简单广播信令消息给其他客户端
        [...clients.values()].forEach((client) => {
            if (client !== ws) {
                client.send(JSON.stringify(data));
            }
        });
    });

    clients.set(ws, ws);

    ws.on("close", () => {
        clients.delete(ws);
    });
});

console.log("信令服务器已启动: ws://localhost:3000");
