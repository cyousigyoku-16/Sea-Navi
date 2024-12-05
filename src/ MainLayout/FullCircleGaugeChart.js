import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import './App.css';
import pointerImage from './Group158.png'; // 确保正确导入图片

const FullCircleGaugeChart = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState({ SysCour: 0, BearGyro: 0, TrueWdir: 0 });
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
            image: '/Group155.png',
            width: 150,
            height: 150,
          }
        },
      ],
      series: [
        {
          name: '船首方向',
          type: 'gauge',
          detail: { show: false },
          data: [{ value: data.SysCour, name: '' }],
          radius: '100%',
          min: 0,
          max: 360,
          startAngle: 90,
          endAngle: -270,
          axisLine: { lineStyle: { width: 0 } },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          pointer: { length: '70%', width: 3 },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#56E8FF' },
              { offset: 1, color: '#6F72FF' }
            ])
          }
        },

        {
          name: '真风向',
          type: 'gauge',
          detail: { show: false },
          data: [{ value: data.TrueWdir, name: '' }],
          radius: '105%',
          min: 0,
          max: 360,
          startAngle: 90,
          endAngle: -270,
          axisLine: { lineStyle: { width: 0 } },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          pointer: {
            show: true,
            icon: `image://${pointerImage}`,
            length: '100%',
            width: 15,
          },
        },
        {
          name: '対地針路',
          type: 'gauge',
          detail: { show: false },
          data: [{ value: data.BearGyro, name: '' }],
          radius: '80%',
          min: 0,
          max: 360,
          startAngle: 90,
          endAngle: -270,
          axisLine: { lineStyle: { width: 0 } },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          pointer: { length: '50%', width: 3 },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 1, color: '#FFE942' },
              { offset: 0, color: '#FF9365' }
            ])
          }
        },
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
          { data: [{ value: data.SysCour }] },
          { data: [{ value: data.TrueWdir }] },
          { data: [{ value: data.BearGyro }] }
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
            SysCour: currentJson.SysCour,
            TrueWdir: currentJson.TrueWdir,
            BearGyro: currentJson.BearGyro
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
      <div ref={chartRef} style={{ width: '150px', height: '150px' }} />
    </div>
  );
};

export default FullCircleGaugeChart;
