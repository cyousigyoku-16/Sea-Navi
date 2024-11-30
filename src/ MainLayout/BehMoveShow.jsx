import { Stack, Box, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

function BehMove() {
    const [data, setData] = useState({ ADraft: "0", FDraft: "0", Trim: "0", RollingAng: "0", PitchingAng: "0", }); // 初始值
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
                        ADraft: currentJson.ADraft, // 更新 SysCour
                        FDraft: currentJson.FDraft, // 更新 TrueWdir
                        Trim: currentJson.Trim, // 更新 TrueWdir
                        RollingAng: currentJson.RollingAng, // 更新 TrueWdir
                        PitchingAng: currentJson.PitchingAng, // 更新 TrueWdir
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
        <Box>
            <Stack direction="row" sx={{
                width: 1120, height: 244, backgroundColor: "#272729", borderRadius: 4,
                position: "relative",
                left: 200,
                top: 30
            }}>

                <Stack direction="row" sx={{ position: "relative", left: 50, alignItems: "center", }} >
                    <Stack direction="column" sx={{
                        width: 156, height: 188,
                        border: "2px solid #4A4A4A", // 直接指定完整的边框样式
                        borderRadius: 4,
                        boxSizing: "border-box", // 将边框和内边距包含在宽高内
                        alignItems: "center", // 让内部内容在垂直方向居中
                        justifyContent: "center", // 内容靠左对齐
                    }}>
                        <Box component="img" sx={{ position: "relative", top: -20, }} src="./chuanshouxiang 2.png" />
                        <Typography color="white" fontSize={32} fontWeight="bold"
                            sx={{
                                position: "relative",
                                top: 24,
                                justifyContent: "center",
                                alignItems: "center", // 垂直方向居中
                            }}>{data.ADraft}m</Typography>
                        <Typography color="white" fontSize={16} sx={{ position: "relative", top: 24, }}>船首喫水</Typography>

                    </Stack>
                    <Stack direction="column" sx={{
                        width: 156, height: 188,
                        border: "2px solid #4A4A4A", // 直接指定完整的边框样式
                        borderRadius: 4,
                        boxSizing: "border-box", // 将边框和内边距包含在宽高内
                        alignItems: "center", // 让内部内容在垂直方向居中
                        justifyContent: "center", // 内容靠左对齐
                        position: "relative", left: 40,
                    }}>
                        <Box component="img" sx={{ position: "relative", top: -20, }} src="./chuanshouxiang1 1.png" />
                        <Typography color="white" fontSize={32} fontWeight="bold"
                            sx={{
                                position: "relative",
                                top: 24,
                                justifyContent: "center",
                                alignItems: "center", // 垂直方向居中
                            }}>{data.FDraft}m</Typography>
                        <Typography color="white" fontSize={16} sx={{ position: "relative", top: 24, }}>船尾喫水</Typography>

                    </Stack>
                    <Stack direction="column" sx={{
                        width: 156, height: 188,
                        border: "2px solid #4A4A4A", // 直接指定完整的边框样式
                        borderRadius: 4,
                        boxSizing: "border-box", // 将边框和内边距包含在宽高内
                        alignItems: "center", // 让内部内容在垂直方向居中
                        justifyContent: "center", // 内容靠左对齐
                        position: "relative", left: 80,
                    }}>
                        <Box component="img" sx={{ position: "relative", top: -20, }} src="./chuanshouxiang2 1.png" />
                        <Typography color="white" fontSize={32} fontWeight="bold"
                            sx={{
                                position: "relative",
                                top: 24,
                                justifyContent: "center",
                                alignItems: "center", // 垂直方向居中
                            }}>{data.Trim}m</Typography>
                        <Typography color="white" fontSize={16} sx={{ position: "relative", top: 24, }}>トリム</Typography>

                    </Stack>
                    <Stack direction="column">
                        <Stack direction="row" sx={{
                            width: 300, height: 90,
                            backgroundColor: "#3C3C3E",
                            borderRadius: 4,
                            alignItems: "center", // 让内部内容在垂直方向居中
                            justifyContent: "flex-start", // 内容靠左对齐
                            position: "relative",
                            left: 200,
                            top: -10


                        }}>
                            <Stack sx={{
                                width: 106, height: 60,
                                backgroundColor: "#272729",
                                borderRadius: 3,
                                display: "flex", // 使用 flex 布局
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                left: 14,

                            }}>
                                <Typography color="white" fontSize={20}>Rolling </Typography>
                            </Stack>
                            <Typography color="white" fontSize={32} fontWeight="bold"
                                sx={{
                                    position: "relative",
                                    left: 40,
                                    justifyContent: "center",
                                    alignItems: "center", // 垂直方向居中
                                }}>{data.RollingAng}°</Typography>
                        </Stack >
                        <Stack direction="row" sx={{
                            width: 300, height: 80,
                            backgroundColor: "#3C3C3E",
                            borderRadius: 4,
                            alignItems: "center", // 让内部内容在垂直方向居中
                            justifyContent: "flex-start", // 内容靠左对齐
                            position: "relative",
                            left: 200,
                            top: 10,


                        }}>
                            <Stack sx={{
                                width: 106, height: 60,
                                backgroundColor: "#272729",
                                borderRadius: 3,
                                display: "flex", // 使用 flex 布局
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                left: 14,

                            }}>
                                <Typography color="white" fontSize={20}>Pitching </Typography>
                            </Stack>
                            <Typography color="white" fontSize={32} fontWeight="bold"
                                sx={{
                                    position: "relative",
                                    left: 40,
                                    justifyContent: "center",
                                    alignItems: "center", // 垂直方向居中
                                }}>{data.PitchingAng}°</Typography>
                        </Stack >

                    </Stack>


                </Stack>
            </Stack>
        </Box>
    );
}

export default BehMove;