// 定义一些工具函数
// 比如返回当前时间
// 比如计算天气平均值
// ...

// todo1：实现一个query 函数用来生成 query 字符串， 形式如下
// ?参数名=参数值&参数名2=参数值

// function getQueryStr(query) {
//     let queryStr = '';

//     for(let key in query) {
//         queryStr += `&${key}=${query[key]}`;
//     }

//     queryStr = queryStr.slice(1);

//     return '?' + queryStr;
// }

// todo 将 query 拼接在 url 后面
// url 有两种情况
//      1. 有 ？
//      2. 没有 ?
// 兼容这两种情况，返回拼接好的路径


// 拼接参数
function addQuery(url, query) {
    let queryStr = ''
    Object.keys(query).forEach((item) => {
        queryStr += `&${item}=${query[item]}`
    })

    if (url.indexOf('?') !== -1){
        return url + queryStr.slice(1)
    }else{
        return url + '?' + queryStr.slice(1)

    }
}

