import React, { useState } from 'react';
import backgroundImg from './background.png'; // 导入本地图片
import normalImg from './normal.png'; // 导入本地图片

import WaterSpdShow from './CenterVisualSpd.jsx';
import DirectionShow from './CenterVisualDir.jsx'
import LocationCard from './LocationCardShow.jsx'
import TimeDateShow from './TimeShow.jsx';
import SpdDateShow from './SpdShow.jsx';
import { Stack, Box, Button } from '@mui/material';
import DirectionCard from './DirectionCardShow.jsx'
import NumberShow from './CenterVisualNum.jsx';
import NotionAreaShow from './NotionArea.jsx';
import CameraFroFeed from './CamFroShow.jsx';
import CameraBehFeed from './CamBehShow.jsx';
import BehWid from './BehWidShow.jsx';
import BehMove from './BehMoveShow.jsx';
import BehElec from './BehElecShow.jsx';
import CppShow from './CppDateShow.jsx'




const App = () => {
    const [behElecSeclect, setbehElecSeclect] = useState('BehWidShow');
    const clickEle = () => {
        setbehElecSeclect('BehElecShow');
    }
    const clickWid = () => {
        setbehElecSeclect('BehWidShow');
    }
    const clickMove = () => {
        setbehElecSeclect('BehMoveShow');
    }

    return (
        <>
            <Box position='static' sx={{ backgroundColor: "#191A1D", width: 700, height: 190, position: 'fixed', top: '30%', left: '40%', zIndex: '1800' }}>
                <Stack direction='row'>
                    <NumberShow />
                    <DirectionShow />
                    <WaterSpdShow />
                    <CppShow />


                </Stack>
            </Box>

            <Box>
                <Stack direction='row'>

                    <Stack direction='column'>
                        <TimeDateShow />
                        <LocationCard />
                        <SpdDateShow />
                        <DirectionCard />
                    </Stack>

                    <Stack direction='column' sx={{ position: "relative", top: 15, left: 30, }} >
                        <NotionAreaShow />
                        <CameraFroFeed />
                        <CameraBehFeed />
                    </Stack>
                </Stack>
                <Stack direction='row' sx={{ alignContent: "center", justifyContent: "flex-start" }}>
                    <Box>
                        <Stack direction='column' sx={{
                            alignContent: "center", justifyContent: "flex-start", position: "relative", top: 25, left: 15,
                        }}>

                            <Button onClick={clickWid} sx={{
                                width: 240,
                                height: 73,
                                justifyContent: "flex-start",

                                borderRadius: 4,
                                backgroundImage: behElecSeclect === 'BehWidShow' ? `url(${backgroundImg})` : `url(${normalImg})`, // 使用本地图片作为背景
                                backgroundSize: 'cover', // 确保图片覆盖整个按钮
                                backgroundRepeat: 'no-repeat', // 防止背景重复
                                backgroundPosition: 'center', // 居中显示图片
                                color: behElecSeclect === 'BehWidShow' ? 'white' : 'gray', // 确保文字对比度
                                textTransform: 'none', // 保持文字原样
                                border: 'none', // 去掉可能的边框
                                boxShadow: 'none', // 去掉默认阴影
                                '&:hover': {
                                    opacity: 0.9, // 鼠标悬停效果
                                },
                            }}>
                                <Box sx={{ width: 30 }}></Box>風｜海象｜舵
                            </Button>
                            <Box sx={{ height: 12 }}></Box>
                            <Button onClick={clickMove} sx={{
                                width: 240,
                                height: 73,
                                borderRadius: 4,
                                justifyContent: "flex-start",
                                backgroundImage: behElecSeclect === 'BehMoveShow' ? `url(${backgroundImg})` : `url(${normalImg})`, // 使用本地图片作为背景
                                backgroundSize: 'cover', // 确保图片覆盖整个按钮
                                backgroundRepeat: 'no-repeat', // 防止背景重复
                                backgroundPosition: 'center', // 居中显示图片
                                color: behElecSeclect === 'BehMoveShow' ? 'white' : 'gray', // 确保文字对比度
                                textTransform: 'none', // 保持文字原样
                                border: 'none', // 去掉可能的边框
                                boxShadow: 'none', // 去掉默认阴影
                                '&:hover': {
                                    opacity: 0.9, // 鼠标悬停效果
                                },
                            }}>
                                <Box sx={{ width: 30 }}></Box>船体動揺
                            </Button>
                            <Box sx={{ height: 12 }}></Box>
                            <Button onClick={clickEle} sx={{
                                width: 240,
                                height: 73,
                                borderRadius: 4,
                                justifyContent: "flex-start",
                                backgroundImage: behElecSeclect === 'BehElecShow' ? `url(${backgroundImg})` : `url(${normalImg})`, // 使用本地图片作为背景
                                backgroundSize: 'cover', // 确保图片覆盖整个按钮
                                backgroundRepeat: 'no-repeat', // 防止背景重复
                                backgroundPosition: 'center', // 居中显示图片
                                color: behElecSeclect === 'BehElecShow' ? 'white' : 'gray', // 确保文字对比度
                                textTransform: 'none', // 保持文字原样
                                border: 'none', // 去掉可能的边框
                                boxShadow: 'none', // 去掉默认阴影
                                '&:hover': {
                                    opacity: 0.9, // 鼠标悬停效果
                                },
                            }}>
                                <Box sx={{ width: 30 }}></Box>プロぺラスラスタ｜電力
                            </Button>
                        </Stack>
                    </Box>
                    {(behElecSeclect === 'BehElecShow') && <BehElec />}
                    {(behElecSeclect === 'BehWidShow') && <BehWid />}
                    {(behElecSeclect === 'BehMoveShow') && <BehMove />}
                </Stack>
            </Box>
        </>
    );
};

export default App;
