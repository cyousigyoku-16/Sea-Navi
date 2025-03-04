import { Stack, Box, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

function NumberShow() {
    const [data, setData] = useState({ SysCour: "0", BearGyro: "0", TrueWdir: "0", TrueWspd: "0" }); // 初始值
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
                        TrueWdir: currentJson.TrueWdir,  // 更新 SysCour
                        TrueWspd: currentJson.TrueWspd,  // 更新 TrueWdir

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
                //backgroundColor: "#272729",
                //border: 1,
                //borderColor: "white",
                //width: 361,
                // height: 150,
                //borderRadius: 6,
                //position: "relative",
                // top: 55,
                //left: 15,
            }}  >
                <Stack direction="row" spacing={5} sx={{
                    justifyContent: "flex-start", alignItems: "flex-start", position: "relative",

                }}>
                    <Stack direction="column" spacing={3.5} sx={{
                        justifyContent: "center", alignItems: "flex-start", position: "relative",
                        top: 18, left: 20,
                    }}>
                        <Box component="img" src="./Line1.png" />
                        <Box component="img" src="./Line1.png" />
                        <Box component="img" src="./Vector12.png" />
                        <Box component="img" src="./Vector12.png" />
                    </Stack>



                    <Stack direction='column' spacing={1} sx={{
                        justifyContent: "center", alignItems: "flex-start", position: "relative",
                        top: 10,
                    }}>

                        <Stack direction="column" >
                            <Typography color="white" fontSize={14} fontWeight="bold"> {data.SysCour}°</Typography>
                            <Typography color="white" fontSize={10} > 船首方向 </Typography>
                        </Stack >
                        <Stack direction="column" >
                            <Typography color="white" fontSize={14} fontWeight="bold"> {data.BearGyro}°</Typography>
                            <Typography color="white" fontSize={10} > 対地針路 </Typography>
                        </Stack >
                        <Stack direction="column" >
                            <Typography color="white" fontSize={14} fontWeight="bold"> {data.TrueWdir}°</Typography>
                            <Typography color="white" fontSize={10} > 真風向 </Typography>
                        </Stack >
                        <Stack direction="column" >
                            <Typography color="white" fontSize={14} fontWeight="bold"> {data.TrueWspd}m/s</Typography>
                            <Typography color="white" fontSize={10} > 真風速 </Typography>
                        </Stack >
                    </Stack>



                </Stack>
            </Box>
        </>
    );
}

export default NumberShow;
