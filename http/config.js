'use strict';
import axios from "axios";
import config from "../config";

// 实例化axios
const axiosInstance = axios.create({
  // 测试用，全局params，需要覆盖可以在调用的地方覆盖，不需要可以删除
  timeout: 10000,
  validateStatus: status => /^[2,4]\d{2}$/.test(status), // 过滤请求响应码
  paramsSerializer: params => JSON.stringify(params), // 序列化数据
  // transformRequest: (data) => {
  //   // 请求前对data进行操作
  //   // return data;
  //   return qs.stringify(data);
  // }
  // transformResponse: (data) => {
  //   // 有需要可以对返回的data进行统一操作
  //   return JSON.parse(data);
  // }
});

// 添加默认请求url
axiosInstance.defaults.baseURL = config.url;

// * 设置全局响应拦截器
axiosInstance.interceptors.response.use((response) => {
  // 对于状态码为4xx的提示网络错误
  if (/^4\d{2}$/.test(response.status)) {
    return Promise.reject(response.data);
  }
  // 对于status返回一些全局状态的时候进行操作过滤
  if (response.data.status === 1) {
    return Promise.resolve(response.data);
  }
  return Promise.reject(response.data);
}, (errMes) => {
  return Promise.reject(errMes);
});

export default axiosInstance;

// export const getJsonP = (postData, actionName) => {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: config.url + `/Action?_name=${actionName}&` + `key=${config.key}&timestamp=${Date.parse(new Date())}`,
//       data:{
//         // data:'{\"longitude\":'+lng+',\"latitude\":'+lat+',\"selfGetTime\":\"\",\"key\":\"'+(key?key:"af45186d2ef020f6")+'\"}'
//         data: JSON.stringify(postData)
//       },
//       type:"POST",
//       dataType:"JSONP",
//       contentType: "application/jsonp; charset=utf-8",
//       success(result) {
//         if (result && result.status == 1) {
//           resolve(result);
//         } else {
//           reject();
//         }
//       },
//       error() {
//         reject();
//       }
//     });
//   })
// }
