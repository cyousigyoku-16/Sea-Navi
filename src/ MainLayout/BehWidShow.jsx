import { Stack, Box, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

function BehWid() {
    const [data, setData] = useState({ TrueWdir: "0", TrueWspd: "0", RelWdir: "0", RelWspd: "0", Turnrate: "0", No1Rud: "0", No2Rud: "0", Hum: "0", Dep: "0" }); // 初始值
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
                        TrueWdir: currentJson.TrueWdir, // 更新 SysCour
                        TrueWspd: currentJson.TrueWspd, // 更新 TrueWdir
                        RelWdir: currentJson.RelWdir, // 更新 TrueWdir
                        RelWspd: currentJson.RelWspd, // 更新 TrueWdir
                        Turnrate: currentJson.Turnrate, // 更新 TrueWdir
                        No1Rud: currentJson.No1Rud, // 更新 TrueWdir
                        No2Rud: currentJson.No2Rud, // 更新 TrueWdir
                        Hum: currentJson.Hum, // 更新 TrueWdir
                        Dep: currentJson.Dep, // 更新 TrueWdir
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
                <Stack direction="column" >
                    <Stack direction="row" sx={{
                        width: 250, height: 70,
                        backgroundColor: "#3C3C3E",
                        borderRadius: 4,
                        alignItems: "center", // 让内部内容在垂直方向居中
                        justifyContent: "flex-start", // 内容靠左对齐
                        position: "relative",
                        left: 20,
                        top: 40
                    }}>
                        <Stack sx={{
                            width: 86, height: 45,
                            backgroundColor: "#272729",
                            borderRadius: 3,
                            display: "flex", // 使用 flex 布局
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            left: 14,

                        }}>
                            <Typography color="white" fontSize={16}>真風向 </Typography>
                        </Stack>
                        <Typography color="white" fontSize={32} fontWeight="bold"
                            sx={{
                                position: "relative",
                                left: 40,
                                justifyContent: "center",
                                alignItems: "center", // 垂直方向居中
                            }}>{data.TrueWdir}°</Typography>
                    </Stack >

                    <Stack direction="row" sx={{
                        width: 250, height: 70,
                        backgroundColor: "#3C3C3E",
                        borderRadius: 4,
                        alignItems: "center", // 让内部内容在垂直方向居中
                        justifyContent: "flex-start", // 内容靠左对齐

                        position: "relative",
                        left: 20,
                        top: 70
                    }}>
                        <Stack sx={{
                            width: 86, height: 45,
                            backgroundColor: "#272729",
                            borderRadius: 3,
                            display: "flex", // 使用 flex 布局
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            left: 14,
                        }}>
                            <Typography color="white" fontSize={16}>真風速</Typography>
                        </Stack>
                        <Typography color="white" fontSize={32} fontWeight="bold"
                            sx={{
                                position: "relative",
                                left: 40,
                                justifyContent: "center",
                                alignItems: "center", // 垂直方向居中
                            }}>{data.TrueWspd}m/s</Typography>
                    </Stack >
                </Stack>

                <Stack direction="column" >
                    <Stack direction="row" sx={{
                        width: 250, height: 70,
                        backgroundColor: "#3C3C3E",
                        borderRadius: 4,
                        alignItems: "center", // 让内部内容在垂直方向居中
                        justifyContent: "flex-start", // 内容靠左对齐

                        position: "relative",
                        left: 40,
                        top: 40
                    }}>
                        <Stack sx={{
                            width: 86, height: 45,
                            backgroundColor: "#272729",
                            borderRadius: 3,
                            display: "flex", // 使用 flex 布局
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            left: 14,
                        }}>
                            <Typography color="white" fontSize={16}>相対風向</Typography>
                        </Stack>
                        <Typography color="white" fontSize={32} fontWeight="bold"
                            sx={{
                                position: "relative",
                                left: 40,
                                justifyContent: "center",
                                alignItems: "center", // 垂直方向居中
                            }}>{data.RelWdir}°</Typography>
                    </Stack >

                    <Stack direction="row" sx={{
                        width: 250, height: 70,
                        backgroundColor: "#3C3C3E",
                        borderRadius: 4,
                        alignItems: "center", // 让内部内容在垂直方向居中
                        justifyContent: "flex-start", // 内容靠左对齐

                        position: "relative",
                        left: 40,
                        top: 70
                    }}>
                        <Stack sx={{
                            width: 86, height: 45,
                            backgroundColor: "#272729",
                            borderRadius: 3,
                            display: "flex", // 使用 flex 布局
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            left: 14,
                        }}>
                            <Typography color="white" fontSize={16}>相対風速</Typography>
                        </Stack>
                        <Typography color="white" fontSize={32} fontWeight="bold"
                            sx={{
                                position: "relative",
                                left: 40,
                                justifyContent: "center",
                                alignItems: "center", // 垂直方向居中
                            }}>{data.RelWspd}m/s</Typography>
                    </Stack >
                </Stack>

                <Stack direction="column" sx={{
                    width: 250, height: 210,
                    backgroundColor: "#191A1D",
                    borderRadius: 4,
                    alignItems: "center", // 让内部内容在垂直方向居中
                    justifyContent: "flex-start", // 内容靠左对齐
                    paddingLeft: 2,
                    position: "relative",
                    left: 60,
                    top: 20
                }}>
                    <Box component="img" sx={{ position: "relative", top: 30, }} src="./Intersect.png" />
                    <Stack direction="row" sx={{
                        width: 225, height: 123,
                        backgroundColor: "#272729",
                        borderRadius: 3,
                        position: "relative", top: 48, left: -6
                    }}>
                        <Stack direction="column">
                            <Typography color="white" fontSize={24} fontWeight="bold"
                                sx={{
                                    position: "relative",
                                    left: 30,
                                    top: 20,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>{data.Dep}m</Typography>
                            <Typography color="white" fontSize={24} fontWeight="bold"
                                sx={{
                                    position: "relative",
                                    left: 30,
                                    top: 30,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>{data.Hum}°</Typography>
                        </Stack>
                        <Stack direction="column">
                            <Typography color="white" fontSize={16}
                                sx={{
                                    position: "relative",
                                    left: 100,
                                    top: 24,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>水深</Typography>
                            <Typography color="white" fontSize={16}
                                sx={{
                                    position: "relative",
                                    left: 100,
                                    top: 48,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>潮流</Typography>
                        </Stack>

                    </Stack>
                </Stack>

                <Stack direction="column" sx={{
                    width: 250, height: 210,
                    backgroundColor: "#191A1D",
                    borderRadius: 4,
                    alignItems: "center", // 让内部内容在垂直方向居中
                    justifyContent: "flex-start", // 内容靠左对齐
                    paddingLeft: 2,
                    position: "relative",
                    left: 70,
                    top: 20
                }}>
                    <Box component="img" sx={{ position: "relative", top: 24, }} src="./DIRE.png" />
                    <Stack direction="row" sx={{
                        width: 225, height: 136,
                        backgroundColor: "#272729",
                        borderRadius: 3,
                        position: "relative", top: 36, left: -6
                    }}>
                        <Stack direction="column">
                            <Typography color="white" fontSize={24} fontWeight="bold"
                                sx={{
                                    position: "relative",
                                    left: 20,
                                    top: 15,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>{data.No1Rud}°</Typography>
                            <Typography color="white" fontSize={24} fontWeight="bold"
                                sx={{
                                    position: "relative",
                                    left: 20,
                                    top: 15,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>{data.No2Rud}°</Typography>
                            <Typography color="white" fontSize={24} fontWeight="bold"
                                sx={{
                                    position: "relative",
                                    left: 20,
                                    top: 15,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>{data.Turnrate}°/s</Typography>
                        </Stack>
                        <Stack direction="column">
                            <Typography color="white" fontSize={16}
                                sx={{
                                    position: "relative",
                                    left: 46,
                                    top: 20,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>NO.1 舵角</Typography>
                            <Typography color="white" fontSize={16}
                                sx={{
                                    position: "relative",
                                    left: 46,
                                    top: 32,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>NO.2 舵角</Typography>
                            <Typography color="white" fontSize={16}
                                sx={{
                                    position: "relative",
                                    left: 46,
                                    top: 44,
                                    justifyContent: "flex-start",
                                    alignItems: "center", // 垂直方向居中
                                }}>回頭角速度</Typography>
                        </Stack>

                    </Stack>
                </Stack>



            </Stack>
        </Box>
    );
}

export default BehWid;
