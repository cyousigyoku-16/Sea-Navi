import React from "react";
import { Box, Typography } from "@mui/material";

const NotionAreaShow = () => {
    return (
        <Box
            sx={{
                width: "950px",          // 设置区域宽度
                height: "100px",         // 设置区域高度
                backgroundImage: "url('./Group172.png')", // 替换成你的背景图片路径
                backgroundSize: "cover", // 背景图填充方式
                backgroundPosition: "center", // 背景图居中
                display: "flex",         // 使用 flex 布局
                justifyContent: "center", // 水平居中
                alignItems: "center",    // 垂直居中
                //borderRadius: "8px",     // 可选：增加圆角
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" // 可选：添加阴影
            }}
        >
            <Typography
                sx={{
                    fontSize: "24px",     // 设置字体大小
                    color: "#ffffff",     // 设置字体颜色
                    fontWeight: "bold",   // 设置字体加粗
                    //textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)" // 添加文字阴影
                }}
            >
                正常に動いています
            </Typography>
        </Box>
    );
};

export default NotionAreaShow;
