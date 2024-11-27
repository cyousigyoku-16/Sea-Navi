
import { Stack, Box, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

function DirectionCard() {
    const [data, setData] = useState({ SysCour: "0", BearGyro: "0", "PosSysTar1-2Azi": "0", ShipPosLat: "0" }); // 初始值
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
                        SysCour: currentJson.SysCour, // 更新 SysCour
                        BearGyro: currentJson.BearGyro,  // 更新 TrueWdir
                        "PosSysTar1-2Azi": currentJson["PosSysTar1-2Azi"],  // 更新 SysCour
                        ShipPosLat: currentJson.ShipPosLat,  // 更新 TrueWdir

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
            <Box sx={{
                backgroundColor: "#272729",
                //border: 1,
                //borderColor: "white",
                width: 361,
                height: 150,
                borderRadius: 6,
                position: "relative",
                top: 55,
                left: 15,
            }}  >
                <Stack direction="row" spacing={5} sx={{
                    justifyContent: "center", alignItems: "flex-start", position: "relative",

                }}>
                    <Stack direction="column" spacing={5} sx={{
                        justifyContent: "center", alignItems: "flex-start", position: "relative",
                        top: 25, left: 0,
                    }}>
                        <Box component="img" src="./HangXing11.png" />
                        <Box component="img" src="./Group66.png" />
                    </Stack>


                    <Stack>
                        <Stack direction='row' spacing={7} sx={{
                            justifyContent: "center", alignItems: "center", position: "relative",
                            top: 10,
                        }}>

                            <Stack direction="column" >
                                <Typography color="white" fontSize={22} fontWeight="bold"> {data.SysCour}°</Typography>
                                <Typography color="white" fontSize={14} > 船首方向 </Typography>
                            </Stack >
                            <Stack direction="column" >
                                <Typography color="white" fontSize={22} fontWeight="bold"> {data.BearGyro}°</Typography>
                                <Typography color="white" fontSize={14} > 対地針路 </Typography>
                            </Stack >
                        </Stack>

                        <Stack direction='row' spacing={7} sx={{
                            justifyContent: "center", alignItems: "center", position: "relative",
                            top: 30,
                        }}>
                            <Stack direction="column" >
                                <Typography color="white" fontSize={22} fontWeight="bold"> {data["PosSysTar1-2Azi"]}°</Typography>
                                <Typography color="white" fontSize={14} > 目標方向 </Typography>
                            </Stack >
                            <Stack direction="column" sx={{
                                justifyContent: "center", alignItems: "center", position: "relative",
                            }}>
                                <Typography color="white" fontSize={22} fontWeight="bold"> 35.25nm</Typography>
                                <Typography color="white" fontSize={14} > 航走距離 </Typography>
                            </Stack >
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
}

export default DirectionCard;
