'use strict';
const config = {
  url: 'http://order.can-dao.com', // 正式url
  key: 'af45186d2ef020f6', // 正式key
  // url: 'http://qc.can-dao.com:16011', // 测试url
  // key: 'c0eec99699aa9ce9' // 测试key
}

// 如果没有引入高德地图则引入
if (window && !window.AMap) {
  let url = 'https://webapi.amap.com/maps?v=1.4.14&key=cddcbf0487cd724098a565842602c27f';
  let jsapi = document.createElement('script');
  jsapi.charset = 'utf-8';
  jsapi.src = url;
  document.head.appendChild(jsapi);
}

export default config;