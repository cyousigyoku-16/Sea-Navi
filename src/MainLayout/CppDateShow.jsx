import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Stack } from "@mui/material";

function CppShow() {
    const [data, setData] = useState({ No1CppWing: 0, No2CppWing: 0, No1Rud: "0", No2Rud: "0" }); // 动态数据初始值
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
                        No1CppWing: parseFloat(currentJson.No1CppWing) || 0, // 确保为数字
                        No2CppWing: parseFloat(currentJson.No2CppWing) || 0, // 确保为数字
                        No1Rud: parseFloat(currentJson.No1Rud) || 0, // 确保为数字
                        No2Rud: parseFloat(currentJson.No2Rud) || 0, // 确保为数字
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
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // 两列
            columnGap: 4, // 列间距宽一些
            rowGap: 0, // 行间距近一些
            fontSize: 10,
            position: "relative",
            left: 70,
            top: 20

        }}>
            {/* 传入动态数据 */}
            <Box sx={{ marginBottom: "-48px", }}>
                <ScaleIndicator value={data.No1Rud} min={-30} max={30} label="NO.1舵角" />

            </Box>
            <Box sx={{ marginBottom: "-48px", }}>
                <ScaleIndicator value={data.No2Rud} min={-30} max={30} label="NO.2舵角" />

            </Box>
            <ScaleIndicator value={data.No1CppWing} min={-30} max={30} label=" NO.1CPP" />
            <ScaleIndicator value={data.No2CppWing} min={-30} max={30} label="NO.2CPP" />
        </Box>
    );
}

const ScaleIndicator = ({ value, min, max, label }) => {
    const numericValue = parseFloat(value); // 确保值为数字类型
    const position = ((numericValue - min) / (max - min)) * 100; // 计算位置百分比

    const zeroPosition = ((0 - min) / (max - min)) * 100; // 计算 0 在刻度尺上的位置

    return (
        <>
            <Stack sx={{ textAlign: "center", }}>
                <div
                    style={{
                        position: "relative",
                        width: "90px",
                        height: "16px",
                        background: "#333",
                        border: "1px solid #666",
                        borderRadius: "4px",
                        margin: "10px auto",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: `${Math.max(0, Math.min(100, position))}%`, // 限制在范围内
                            width: "2px",
                            background: "lime",
                            transition: "left 0.3s ease",
                        }}
                    ></div>

                    {/* 固定显示 0 的位置：增加一个标记（垂直线） */}
                    <div
                        style={{
                            position: "absolute",

                            left: "50%", // 0 固定在中间
                            transform: "translateX(-50%)",
                            height: "16px", // 设置线的高度
                            width: "1px", // 设置线的宽度
                            backgroundColor: "#FFD700", // 颜色
                        }}
                    ></div>

                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",

                        color: "#FFF",

                    }}
                >
                    <span>{min}°</span>
                    <div style={{ fontSize: "16px", fontWeight: "bold", color: "white" }}>
                        {numericValue.toFixed(1)}° {/* 显示为一位小数 */}
                    </div>
                    <span>{max}°</span>

                </div>
                <div style={{ fontSize: "10px", color: "white", opacity: 0.5 }}>
                    {label}
                </div>
            </Stack>

        </>
    );
};

export default CppShow;
