import { Stack, Typography, Box } from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import React, { useState, useEffect, useRef } from "react";
//import "leaflet/dist/leaflet.css";

function LocationCard() {
  const [data, setData] = useState({ PosOffsetLat: "0", PosSysLon: "0", PosOffsetLatSign: "N", PosSysLonSign: "E" }); // 初始值
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
            PosOffsetLat: currentJson.PosOffsetLat, // 更新 
            PosSysLon: currentJson.PosSysLon, // 更新 
            PosOffsetLatSign: currentJson.PosOffsetLatSign, // 更新 
            PosSysLonSign: currentJson.PosSysLonSign, // 更新 

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: 361,
        height: 100,
        border: 1,             // 设置边框宽度
        borderColor: "#4A4A4A", // 设置边框颜色
        borderRadius: 6,
        position: "relative",
        top: 25,
        left: 15,

      }}
    >
      {/* 左侧文本部分 */}
      <Stack
        direction="column"
        justifyContent="center"
        sx={{ justifyContent: "flex-start", alignItems: "flex-start", padding: 2, }}
      >
        <Typography color="white" fontSize={16} fontWeight="bold">
          {data.PosOffsetLat}°{data.PosOffsetLatSign}
        </Typography>
        <Typography color="white" fontSize={16} fontWeight="bold">
          {data.PosSysLon}°{data.PosSysLonSign}
        </Typography>
        <Typography
          color="#A0A0A0"
          fontSize={12}
          sx={{
            marginTop: 1,
            backgroundColor: "#303134", // 设置背景颜色
            width: 59,                 // 固定宽度
            height: 20,                // 固定高度
            display: "flex",           // 使用 flex 布局
            alignItems: "center",      // 垂直居中
            justifyContent: "center",  // 水平居中
            borderRadius: 2,          // 圆角为 2  
          }}
        >
          当前位置
        </Typography>
      </Stack>

      {/* 右侧地图部分 */}
      <Box
        sx={{
          position: "absolute", // 使用绝对定位
          top: "50%",           // 垂直方向居中
          right: 6,            // 距离右边框 10px
          transform: "translateY(-50%)", // 修正垂直方向偏移
          borderRadius: 5,
          overflow: "hidden", // 确保地图边界圆角
          width: 170,        // 设置地图容器宽度
          height: 88,       // 设置地图容器高度
          marginLeft: "auto", // 让地图靠右
          justifyContent: "center", alignItems: "center"

        }}
      >
        <MapContainer
          center={[35.4682, 139.848]} // 设置地图的中心坐标
          zoom={15}
          style={{ height: "80%", width: "80%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[35.4682, 139.848]} />
        </MapContainer>
      </Box>
    </Box>
  );
};

export default LocationCard;
