// 天气主要逻辑

// 负责发送请求 (调用 xhr.js 的请求函数)

// 接受请求后局部渲染页面

const predict_shape_box = document.querySelector('.predict_shape_box');
var tempBarChart = echarts.init(
    predict_shape_box,
    '',
    {
        height: '300px'
    }
);
var tempBaroption;

tempBaroption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: '{a}<br />{b} {c} ℃'
    },
    xAxis: {
        type: 'category',
        data: ['0am', '2am', '4am', '6am', '8am', '10am', '12am', '14am', '16am', '18am', '20am', '22am']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [20, 31, 29, 38, 34, 29, 19, 22, 25, 19, 18, 15],
            type: 'bar',
            showBackground: true,
            name: '温度',
            color: '#FFC0CB',
        }
    ]
};

tempBaroption && tempBarChart.setOption(tempBaroption);




// import * as echarts from 'echarts';

const forecast_7_box = document.querySelector('.forecast_7_box');
var temLineChart = echarts.init(
    forecast_7_box,
    '',
    {
        height: '300px'
    }
);
var temLineoption;

temLineoption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: ''
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [30, 30, 24, 18, 35, 37, 26],
            type: 'line',
            showBackground: true,
            name: '温度',
            color: '#FF1493'
        }
    ]
};


temLineoption && temLineChart.setOption(temLineoption);






