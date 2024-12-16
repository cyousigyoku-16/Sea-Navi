import { Stack, Typography, Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import React, { useState, useEffect, useRef } from "react";
//import "leaflet/dist/leaflet.css";

function UpdateMap({ position }) {
  const map = useMap();
  map.setView(position, map.getZoom()); // 更新地图中心
  return <Marker position={position} />;
}

function LocationCard() {
  const [position, setPosition] = useState([0, 0]); // 经纬度状态
  const [locationData, setLocationData] = useState({
    lat: "0",
    lon: "0",
  });

  // 获取真实位置
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(6);
          const lon = pos.coords.longitude.toFixed(6);
          setPosition([lat, lon]);
          setLocationData({
            lat: lat,
            lon: lon,
          });
        },
        (error) => console.error("Geolocation Error:", error),
        {
          enableHighAccuracy: true, // 启用高精度
          timeout: 5000, // 超时时间
          maximumAge: 0, // 不缓存位置
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

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
          {locationData.lat}° N
        </Typography>
        <Typography color="white" fontSize={16} fontWeight="bold">
          {locationData.lon}° E
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

        <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <UpdateMap position={position} />
        </MapContainer>
      </Box>
    </Box>
  );
};

export default LocationCard;
