
// 服务器地址和端口配置
const SERVER_IP = "72.38.3.67";
const AIS_PORT = 60000;
const NAVIGATION_PORT = 60001;

// 数据存储数组
let aisData = [];
let navigationData = [];

// 获取数据函数
async function fetchData(port, dataArray) {
    const url = `http://${SERVER_IP}:${port}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`网络错误: ${response.status}`);
        }
        const data = await response.json();
        dataArray.push(...data);
        console.log(`端口 ${port} 数据:`, data);
    } catch (error) {
        console.error(`无法从端口 ${port} 获取数据:`, error);
    }
}

// 周期性数据获取
setInterval(() => {
    fetchData(AIS_PORT, aisData);
    fetchData(NAVIGATION_PORT, navigationData);
}, 1000); // 每1秒获取一次数据