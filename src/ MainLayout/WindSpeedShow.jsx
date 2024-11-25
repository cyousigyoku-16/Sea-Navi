import { Stack, Box, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

function WindSpeed() {
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
                        TrueWspd: currentJson.TrueWspd, // 更新 风速
                    });
                    blockIndexRef.current = (blockIndexRef.current + 1) % jsonBlocks.length; // 更新索引
                } catch (error) {
                    console.error("Error parsing JSON block:", error); // 解析错误处理
                }
            }
        }, 2000); // 每2秒更新一次

        return () => clearInterval(interval); // 清理定时器
    }, [jsonBlocks]); // 依赖于 jsonBlocks


    return (
        <>
            <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }}>
                <Box component="img" src="./Vector12.png" />
                <Box sx={{ width: 30 }}></Box>
                <Stack direction="column" sx={{ alignItems: "center" }}>
                    <Typography color="white" fontSize={30} fontWeight="bold">{data.TrueWspd}m/s</Typography>
                    <Typography color="white" fontSize={14}>真風速</Typography>
                </Stack >
            </Stack>
        </>
    );
}

export default WindSpeed;
