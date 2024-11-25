import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
//import './App.css';


const WaterSpeedChart = () => {
    const chartRef = useRef(null);
    const [data, setData] = useState({ SysSpd: 0 });
    const [jsonBlocks, setJsonBlocks] = useState([]);
    const blockIndexRef = useRef(0);

    // 初始化图表，仅在初次渲染时运行
    useEffect(() => {
        const myChart = echarts.init(chartRef.current);

        const option = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}°'
            },
            graphic: [
                {
                    type: 'image',
                    id: 'background',
                    left: 'center',
                    top: 'center',
                    style: {
                        image: '/Group159.png',
                        width: 300,
                        height: 260,

                    }
                },
            ],
            series: [
                {
                    name: '対水速力/kt',
                    type: 'gauge',
                    detail: { show: false },   // 显示数据                    
                    data: [{ value: data.SysSpd, name: '' }],
                    radius: '100%',
                    min: -5,
                    max: 20,
                    startAngle: -120,
                    endAngle: 0,
                    axisLine: { lineStyle: { width: 0 } },
                    axisLabel: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    pointer: { length: '70%', width: 8 },
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#6FFF97' },
                            { offset: 1, color: '#7BE1FE' }
                        ])
                    }
                }
            ]
        };

        myChart.setOption(option);
        window.addEventListener('resize', myChart.resize);

        return () => {
            window.removeEventListener('resize', myChart.resize);
            myChart.dispose();
        };
    }, []);

    // 更新图表数据，仅在数据变化时运行
    useEffect(() => {
        const myChart = echarts.getInstanceByDom(chartRef.current);
        if (myChart) {
            myChart.setOption({
                series: [
                    { data: [{ value: data.SysSpd }] }
                ]
            });
        }
    }, [data]);

    // 加载文件并分割为 JSON 块
    useEffect(() => {
        const loadFile = async () => {
            try {
                const response = await fetch('OutputData.txt');
                const text = await response.text();
                const blocks = text.match(/\{[^}]+\}/g) || [];
                setJsonBlocks(blocks);
            } catch (error) {
                console.error('Error loading file:', error);
            }
        };
        loadFile();
    }, []);

    // 每2秒读取一块 JSON 数据并更新数据
    useEffect(() => {
        const interval = setInterval(() => {
            if (jsonBlocks.length > 0) {
                try {
                    const currentJson = JSON.parse(jsonBlocks[blockIndexRef.current]);
                    setData({
                        SysSpd: currentJson.SysSpd
                    });
                    blockIndexRef.current = (blockIndexRef.current + 1) % jsonBlocks.length;
                } catch (error) {
                    console.error('Error parsing JSON block:', error);
                }
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [jsonBlocks]);

    return (
        <div>
            <h2></h2>
            <div ref={chartRef} style={{ width: '400px', height: '300px' }} />
        </div>
    );
};

export default WaterSpeedChart;
