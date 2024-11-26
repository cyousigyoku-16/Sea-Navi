
import { Stack, Box, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

function ST() {
    const [data, setData] = useState({ DayLocal: "0", TimeLocal: "0" }); // 初始值
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
                        DayLocal: currentJson.DayLocal, // 更新 SysCour
                        TimeLocal: currentJson.TimeLocal, // 更新 TrueWdir
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
            <Box    >
                <Stack direction="row">
                    <Stack direction="column" >
                        <Typography color="white" fontSize={20} fontWeight="bold"> {data.DayLocal} </Typography>
                        <Typography color="white" fontSize={20} fontWeight="bold"> {data.TimeLocal} </Typography>
                        <Box sx={{ width: 20 }}></Box>
                        <Typography color="white" fontSize={16} sx={{ marginTop: 1 }}>ST</Typography>
                    </Stack >
                </Stack>
            </Box>
        </>
    );
}

export default ST;
