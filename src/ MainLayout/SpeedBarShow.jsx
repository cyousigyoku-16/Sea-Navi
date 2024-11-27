import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

function SpeedProgressBar() {
    const [data, setData] = useState({ TrueWspd: "0" }); // 初始值
    const [jsonBlocks, setJsonBlocks] = useState([]); // 保存 JSON 数据块
    const blockIndexRef = useRef(0); // 当前读取的 JSON 块索引

    // 加载文件并分割为 JSON 块
    useEffect(() => {
        const loadFile = async () => {
            try {
                const response = await fetch("OutputData.txt"); // 加载 txt 文件
                const text = await response.text(); // 获取文件内容
                const blocks = text.match(/\{[^}]+\}/g) || []; // 使用正则提取 JSON 块
                setJsonBlocks(blocks); // 保存 JSON 数据块
            } catch (error) {
                console.error("Error loading file:", error); // 错误处理
            }
        };
        loadFile();
    }, []);

    // 每2秒读取一块 JSON 数据并更新状态
    useEffect(() => {
        const interval = setInterval(() => {
            if (jsonBlocks.length > 0) {
                try {
                    const currentJson = JSON.parse(jsonBlocks[blockIndexRef.current]); // 解析当前块
                    setData({
                        TrueWspd: currentJson.TrueWspd, // 更新 SysSpd
                    });
                    blockIndexRef.current = (blockIndexRef.current + 1) % jsonBlocks.length; // 更新索引
                } catch (error) {
                    console.error("Error parsing JSON block:", error); // 解析错误处理
                }
            }
        }, 2000); // 每2秒更新一次

        return () => clearInterval(interval); // 清理定时器
    }, [jsonBlocks]); // 依赖于 jsonBlocks

    // 确保 TrueWspd 在 0 到 30 范围内
    const clampedSpeed = Math.min(Math.max(parseFloat(data.TrueWspd), 0), 40);

    // 根据 speed 设置渐变颜色
    const getGradientBackground = (speed) => {
        if (speed <= 15) {
            return "linear-gradient(to right, #F7FFAE, #91FFD7)"; // 0-15 绿蓝渐变
        } else if (speed <= 25) {
            return "linear-gradient(to right, #91FFD7, #7288FF)"; // 15-25 蓝紫渐变
        } else {
            return "linear-gradient(to right, #7288FF, #FF72A5)"; // 25-40紫红渐变
        }
    };

    // 计算进度条宽度
    const progressWidth = (clampedSpeed / 40) * 70; // 70 是总长度

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

            <Typography sx={{ fontSize: 10, color: "white" }} > 弱 </Typography>

            <Box sx={{ width: 70, height: 3, backgroundColor: "#393939", borderRadius: 10, overflow: "hidden", position: "relative" }}>
                <Box
                    sx={{
                        width: `${progressWidth}px`,
                        height: "100%",
                        background: getGradientBackground(clampedSpeed),
                        transition: "width 0.3s ease, background 0.3s ease",
                    }}
                ></Box>

            </Box>
            <Typography sx={{ fontSize: 10, color: "white", }}> 强</Typography>

        </Box>
    );
}

export default SpeedProgressBar;