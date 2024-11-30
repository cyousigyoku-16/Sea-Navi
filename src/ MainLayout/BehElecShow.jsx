import { Stack, Box, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

function BehElec() {
    const [data, setData] = useState({ BowThrusterWing: "0", No1CppWing: "0", No1Rpm: "0", No1Hpower: "0", No2CppWing: "0", No2Rpm: "0", No2Hpower: "0", No1D_GEpower: "0", No2D_GEpower: "0", No3D_GEpower: "0" }); // 初始值
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
                        BowThrusterWing: currentJson.BowThrusterWing, // 更新 SysCour
                        No1CppWing: currentJson.No1CppWing, // 更新 TrueWdir
                        No1Rpm: currentJson.No1Rpm, // 更新 TrueWdir
                        No1Hpower: currentJson.No1Hpower, // 更新 TrueWdir
                        No2CppWing: currentJson.No2CppWing, // 更新 TrueWdir
                        No2Rpm: currentJson.No2Rpm, // 更新 TrueWdir
                        No2Hpower: currentJson.No2Hpower, // 更新 TrueWdir
                        No1D_GEpower: currentJson.No1D_GEpower,
                        No2D_GEpower: currentJson.No2D_GEpower,
                        No3D_GEpower: currentJson.No3D_GEpower,
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

                <Stack direction="row" sx={{ position: "relative", left: 30, alignItems: "center", }} >
                    <Stack direction="column" sx={{
                        width: 193, height: 205,
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
                            }}>{data.BowThrusterWing}°</Typography>
                        <Typography color="white" fontSize={16} sx={{ position: "relative", top: 24, }}>バウスラスタ</Typography>

                    </Stack>
                </Stack>
                <Stack direction="column" sx={{ position: "relative", top: 20, left: 40, alignItems: "center", justifyContent: "flex-start", }} >
                    <Stack direction="row" sx={{
                        width: 503, height: 92,
                        border: "2px solid #4A4A4A", // 直接指定完整的边框样式
                        borderRadius: 4,
                        boxSizing: "border-box", // 将边框和内边距包含在宽高内
                        alignItems: "center", // 让内部内容在垂直方向居中
                        justifyContent: "flex-start", // 内容靠左对齐
                    }}>
                        <Typography color="#787878" fontSize={20} sx={{ position: "relative", left: 15, }}>N0.1</Typography>
                        <Box component="img" sx={{ position: "relative", left: 25, }} src="./Vector4.png" />
                        <Stack direction="column" sx={{ alignItems: "center", position: "relative", left: 60, }} >
                            <Typography color="white" fontSize={26} fontWeight="bold"> {data.No1CppWing}</Typography>
                            <Typography color="white" fontSize={16} >CPP翼角/°</Typography>
                        </Stack >
                        <Stack direction="column" sx={{ alignItems: "center", position: "relative", left: 120, }} >
                            <Typography color="white" fontSize={26} fontWeight="bold"> {data.No1Rpm}</Typography>
                            <Typography color="white" fontSize={16} >Rpm/min</Typography>
                        </Stack >
                        <Stack direction="column" sx={{ alignItems: "center", position: "relative", left: 180, }} >
                            <Typography color="white" fontSize={26} fontWeight="bold"> {data.No1Hpower}</Typography>
                            <Typography color="white" fontSize={16} >Shaft/Kw</Typography>
                        </Stack >


                    </Stack>
                    <Stack direction="row" sx={{
                        width: 503, height: 92,
                        border: "2px solid #4A4A4A", // 直接指定完整的边框样式
                        borderRadius: 4,
                        boxSizing: "border-box", // 将边框和内边距包含在宽高内
                        alignItems: "center", // 让内部内容在垂直方向居中
                        justifyContent: "flex-start", // 内容靠左对齐
                        position: "relative", top: 20,
                    }}>
                        <Typography color="#787878" fontSize={20} sx={{ position: "relative", left: 15, }}>N0.2</Typography>
                        <Box component="img" sx={{ position: "relative", left: 25, }} src="./Vector4.png" />
                        <Stack direction="column" sx={{ alignItems: "center", position: "relative", left: 60, }} >
                            <Typography color="white" fontSize={26} fontWeight="bold"> {data.No2CppWing}</Typography>
                            <Typography color="white" fontSize={16} >CPP翼角/°</Typography>
                        </Stack >
                        <Stack direction="column" sx={{ alignItems: "center", position: "relative", left: 120, }} >
                            <Typography color="white" fontSize={26} fontWeight="bold"> {data.No2Rpm}</Typography>
                            <Typography color="white" fontSize={16} >Rpm/min</Typography>
                        </Stack >
                        <Stack direction="column" sx={{ alignItems: "center", position: "relative", left: 180, }} >
                            <Typography color="white" fontSize={26} fontWeight="bold"> {data.No2Hpower}</Typography>
                            <Typography color="white" fontSize={16} >Shaft/Kw</Typography>
                        </Stack >


                    </Stack>
                </Stack>
                <Stack direction="column" sx={{
                    width: 324, height: 205,
                    backgroundColor: "#191A1D",
                    borderRadius: 4,
                    alignItems: "center", // 让内部内容在垂直方向居中
                    justifyContent: "flex-start", // 内容靠左对齐
                    paddingLeft: 2,
                    position: "relative",
                    left: 60,
                    top: 20
                }}>
                    <Box component="img" sx={{ position: "relative", top: 24, }} src="./DIRE.png" />
                    <Stack direction="row" sx={{
                        width: 286, height: 132,
                        backgroundColor: "#272729",
                        borderRadius: 3,
                        position: "relative", top: 36, left: -6
                    }}>
                        <Stack direction="column">
                            <Typography color="#787878" fontSize={20}
                                sx={{
                                    position: "relative",
                                    left: 50,
                                    top: 15,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>N0.1</Typography>
                            <Typography color="#787878" fontSize={20}
                                sx={{
                                    position: "relative",
                                    left: 50,
                                    top: 25,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>N0.2</Typography>
                            <Typography color="#787878" fontSize={20}
                                sx={{
                                    position: "relative",
                                    left: 50,
                                    top: 35,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>N0.3</Typography>
                        </Stack>
                        <Stack direction="column">
                            <Typography color="white" fontSize={20} fontWeight="bold"
                                sx={{
                                    position: "relative",
                                    left: 116,
                                    top: 15,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>{data.No1D_GEpower}Kw</Typography>
                            <Typography color="white" fontSize={20} fontWeight="bold"
                                sx={{
                                    position: "relative",
                                    left: 116,
                                    top: 25,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>{data.No2D_GEpower}Kw</Typography>
                            <Typography color="white" fontSize={20} fontWeight="bold"
                                sx={{
                                    position: "relative",
                                    left: 116,
                                    top: 35,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>{data.No3D_GEpower}Kw</Typography>
                        </Stack>

                    </Stack>
                </Stack>


            </Stack>
        </Box>
    );
}

export default BehElec;