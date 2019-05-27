'use strict';
import axiosInstance from './config.js';
// import { getJsonP } from './config.js';
import config from "../config";

const query = () => `key=${config.key}&timestamp=${Date.parse(new Date())}`;

// 对应的请求接口配置

const api = {
  // cacheCityName 缓存城市名
  cacheCityName(data) {
    return axiosInstance({
      method: 'post',
      url: '/Cache?actionId=1&_name=set',
      data
    });
  },
  // [getNearestStore 获取最近一家门店]
  getNearestStore(data) {
    return axiosInstance({
      method: 'post',
      url: '/Action?_name=getNearestStore&' + query(),
      data: { 
        actionName: 'candao.storeStandard.getNearStore',
        content: data
      }
    });
  },
  // getNearStores 获取附近门店列表
  getNearStores(data) {
    return axiosInstance({
      method: 'post',
      url: '/Action?_name=getNearStoreList&' + query(),
      data: { 
        actionName: 'candao.storeStandard.getNearStoreList',
        content: data
      }
    });
  },
  // getStoreById 根据storeId获取门店信息
  getStoreById: (data) => axiosInstance({
    method: 'post',
    url: '/Action?_name=getStoreById&' + query(),
    data: { 
      actionName: 'candao.storeStandard.getStore',
      content: data
    }
  }),
  // 根据关键字联想商家地址库列表
  getAddressFromList: (data) => axiosInstance({
    method: 'post',
    url: '/Action?_name=getAddressFromList&' + query(),
    data: { 
      actionName: 'candao.storeOwn.listWhiteListAddress',
      content: data
    }
  })
}

export default api;