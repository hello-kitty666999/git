// 定义一个通用的发送请求的方法


// todo: 将 query 对象中的属性挨个拼接到请求地址后面，用 & 符号相连接，? 符后面接 query 字符串
function ajax(url, method, query) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // 如何调用 addQuery
        xhr.open(method, addQuery(url, query))
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200) {
                resolve(xhr.responseText)
            } else {
                reject(xhr.responseText)
            }
        }
        xhr.send()
    })
}

let id;
let icon;
let search = document.querySelector('#input');
search.addEventListener('click', () => {
    let city = document.querySelector('.search_box_input').value
    // console.log(city);
    if (city !== '') {
        ajax(
            'https://geoapi.qweather.com/v2/city/lookup',
            'get',
            {
                key: 'dc697d48689647ebb00040d9674fdff0',
                location: city,
            }
        ).then(res => {
            // console.log(res);
            res = JSON.parse(res)
            id = res.location[0].id;
            ajax1()
        }).catch(err => {
            console.log(err);
        })

    }
})


window.onload = function () {
    id = '101010100';
    icon = document.querySelectorAll('.tianqi')
    ajax1()
}


// ajax(
//     // 请求地址
//     'https://devapi.qweather.com/v7/weather/24h',
//     // 方式
//     'get',
//     // query 参数
//     {
//         // 用户 key
//         key: '782531ef0c584f6c8aaae2f571873c2e',
//         // 经纬度
//         location: '101110101'
//     }
// )

// .then(res => {
//     console.log(getQueryStr)
// })
// .catch(err => {
//     console.log(err)
// })

// window.onload = () => {

function ajax1() {
    // console.log(2222)
    ajax(
        'https://devapi.qweather.com/v7/weather/now',
        'get',
        {
            location: `${id}`,
            key: 'dc697d48689647ebb00040d9674fdff0'
        }
    ).then(resStr => {
        const res = JSON.parse(resStr);
        // console.log(res);
        

        let temp = document.querySelector('#number')
        temp.innerHTML = `${res.now.temp}${'°'}`

        let text = document.querySelector('#text')
        text.innerHTML = res.now.text

        let windDir = document.querySelector('#current_item_1_1 ')
        windDir.innerHTML = res.now.windDir

        let windScale = document.querySelector('#current_item_1_2')
        windScale.innerHTML = `${res.now.windScale}${'级'}`

        let humidity = document.querySelector('#current_item_2_2')
        humidity.innerHTML = `${res.now.humidity}${'%'}`

        let pressure = document.querySelector('#current_item_3_2')
        pressure.innerHTML = `${res.now.pressure}${'kpa'}`

        let precip = document.querySelector('#current_item_4_2')
        precip.innerHTML = `${res.now.precip}${'mm'}`




    })
        .catch(err => {
            console.log(err);
        })
    // }



    ajax(
        'https://devapi.qweather.com/v7/air/now',
        'get',
        {
            location: `${id}`,
            key: 'dc697d48689647ebb00040d9674fdff0'
        }
    ).then(resStr => {
        const res = JSON.parse(resStr);
        // console.log(res);

        let pm2p5 = document.querySelector('#current_item_5_2')
        pm2p5.innerHTML = res.now.pm2p5


    })
        .catch(err => {
            console.log(err);
        })



    ajax(
        'https://devapi.qweather.com/v7/weather/24h',
        'get',
        {
            location: `${id}`,
            key: 'dc697d48689647ebb00040d9674fdff0'
        }
    ).then(resStr => {
        const res = JSON.parse(resStr);
        // console.log(res);

        let temp = res.hourly[0].temp
        let fxTime = res.hourly[0].fxTime


        // 定义一个空数组
        // 遍历一天的温度数组，每隔一小时取值放入新数组
        // 将新数组赋值给  tempBaroption.series[0].data

        let newArr = []
        let newArr2 = []
        for (let i = 0; i < 24; i++) {
            if (i % 2 === 0) {
                newArr.push(res.hourly[i].temp)
                newArr2.push(res.hourly[i].fxTime.slice(11, 16))

            }
        }
        Number(newArr2)
        // console.log(newArr2);

        tempBaroption.xAxis.data = newArr2
        // console.log(tempBaroption);
        tempBaroption.series[0].data = newArr

        // console.log(res)
        // console.log(res.hourly)

        // let icon = document.querySelectorAll('.tianqi')
        // 这样取 icon，由于第一次，在循环里覆盖了所有 icon 的 class .tianqi 被替换为 .qi-302
        // 所以第二次再调用 document.querySelectorAll('.tianqi') 就会取到空元素集合
        // 重点！！！，一会儿会考
        for (let j = 0; j < 24; j++) {
            if (j % 2 !== 0) continue;
            icon[j / 2].className = `qi-${res?.hourly[j]?.icon}`

        }

        tempBaroption && tempBarChart.setOption(tempBaroption);


    })
        .catch(err => {
            console.log(err);
        })




    ajax(
        'https://devapi.qweather.com/v7/weather/7d',
        'get',
        {
            location: `${id}`,
            key: 'dc697d48689647ebb00040d9674fdff0'
        }
    ).then(resStr => {
        const res = JSON.parse(resStr)
        let tempMax = res.daily[0].tempMax

        let newArr = []
        for (let i = 0; i < 7; i++) {
            newArr.push(res.daily[i].tempMax)
        }

        temLineoption.series[0].data = newArr
        temLineoption && temLineChart.setOption(temLineoption);
    })
        .catch(err => {
            console.log(err);
        })



    ajax(
        'https://devapi.qweather.com/v7/indices/1d',
        'get',
        {
            location: `${id}`,
            key: 'dc697d48689647ebb00040d9674fdff0',
            type: `1,2,3,4,5,6,7,8,9,10,11,12`
        }
    ).then(resStr => {
        const res = JSON.parse(resStr)
        // console.log(res);

        let close = document.querySelectorAll('.close')
        // console.log(close);
        for (let i = 0; i < 10; i++) {
            // console.log(res.daily[i].name + ' ' + res.daily[i].category)
            close[i].innerHTML = res.daily[i].name + ' ' + res.daily[i].category
        }



        let information = document.querySelectorAll('.information')
        // console.log(information);
        for (let j = 0; j < 10; j++) {
            information[j].innerHTML = res.daily[j].text
        }
    })
        .catch(err => {
            console.log(err);
        })
}

