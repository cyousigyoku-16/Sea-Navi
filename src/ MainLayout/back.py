import asyncio
import websockets
import socket

# WebSocket 服务端配置
HOST = "0.0.0.0"
PORT = 8765

# TCP 服务端配置
TCP_HOST = "172.38.3.67"
TCP_PORT_AIS = 60000
TCP_PORT_NAV = 60001


async def tcp_to_websocket(websocket, path):
    try:
        # 创建 TCP 连接
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as tcp_client:
            tcp_client.connect((TCP_HOST, TCP_PORT_AIS))

            while True:
                # 接收 TCP 数据
                data = tcp_client.recv(1024)
                if not data:
                    break

                # 转发数据到 WebSocket
                await websocket.send(data.decode("utf-8"))
    except Exception as e:
        print(f"Error: {e}")

# 启动 WebSocket 服务
start_server = websockets.serve(tcp_to_websocket, HOST, PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
