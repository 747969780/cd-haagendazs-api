'use strict';
import ajaxApi from './api.js';

const getApi = {
  /**
   * [cacheCityName 缓存城市名]
   * @param  {[type]} city [城市名]
   */
  cacheCityName(city) {
    return ajaxApi.cacheCityName({ cityName: city });
  },
  /**
   * [getNearestStore 获取最近一家门店]
   * @param  {[type]}   lng&lat  [经纬度]
   * @param  {[type]}   address  [地址]
   * businessType 业务类型，不传默认全部
   */
  getNearestStore(lng, lat, address, businessType = [1,2,3,4]) {
    const params = {
      coordinate: [lng, lat],
      searchName: address,
      businessType
    };
    return ajaxApi.getNearestStore(params)
      .then((res) => {
        // 过滤一下只传必要的字段
        const response = {
          cityName: res.data.cityName,
          district: res.data.districtName,
          address: res.data.storeAddress,
          brandName: res.data.brandName,
          storeName: res.data.storeName,
          distance: res.distance,
          extId: res.data.extraStoreId || ''
        };
        response.distance = AMap.GeometryUtil.distance([lng, lat], res.data.coordinate);
        return response;
      });
  },
   /**
    * [getNearStores 获取附近门店列表]
    * @param  {[type]}   lng&lat  [经纬度]
    * @param  {[type]}   address  [地址]
    * businessType 业务类型，不传默认为全部
    */
  getNearStores(lng, lat, address, businessType = [1,2,3,4]) {
    const params = {
      coordinate: [lng, lat],
      searchName: address,
      businessType,
      pageNow: 1,
      pageSize: 999
    };
    return ajaxApi.getNearStores(params)
      .then((res) => {
        // 过滤一下只传必要的字段
        return res.data.rows.map((val) => ({
          cityName: val.cityName,
          district: val.districtName,
          address: val.storeAddress,
          brandName: val.brandName,
          storeName: val.storeName,
          extId: val.extraStoreId || '',
          distance: val.distance
        }))
      });
  },
  /**
   * [getStoreById 根据storeId获取门店信息]
   * @param  {[type]} storeId [门店ID]
   * @param  {[type]}   lng&lat  [经纬度]
   * businessType 业务类型，不传默认外卖
   */
  getStoreById(storeId, lng, lat, businessType = 1) {
    const params = {
      storeId,
      coordinate: [lng, lat],
      businessType
    };
    return ajaxApi.getStoreById(params)
      .then((res) => {
        // 过滤一下只传必要的字段
        const response = {
          cityName: res.data.cityName,
          district: res.data.districtName,
          address: res.data.storeAddress,
          brandName: res.data.brandName,
          storeName: res.data.storeName,
          extId: res.data.extraStoreId || ''
        };
        response.distance = AMap.GeometryUtil.distance([lng, lat], res.data.coordinate);
        return response;
      });
  },
  /**
   * [getAddressFromList 根据关键字联想商家地址库列表]
   * @param  {[type]} address [查询关键字]
   */
  getAddressFromList(address) {
    const params = {
      address
    }
    return ajaxApi.getAddressFromList(params)
      .then((res) => {
        return res.data.map((val) => {
          ['township', 'street', 'streetNumber', 'district'].forEach((key) => {
            if (!val[key]) {
              val[key] = '';
            }
          });
          return val;
        })
      });
  },
  /**
   * [getLatLngInfo 根据地址查询经纬度]
   * @param  {[type]}   city     [城市名]
   * @param  {[type]}   address  [地址关键字]
   */
  getLatLngInfo(city, address) {
    return new Promise(function(resolve, reject) {
      AMap.plugin('AMap.Geocoder', function() {
        const geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city
        });
        const location = function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            const response = {
              formattedAddress: result.geocodes[0].formattedAddress,  //地址
              district: result.geocodes[0].addressComponent.district, //地区
              lat: result.geocodes[0].location.lat,
              lng: result.geocodes[0].location.lng
            };
            resolve(response);
          }else{
            reject();
          }
        };
        geocoder.getLocation(address, location);
      });
    });
  },
  /**
   * [getAddressByLatLng 根据经纬度获得地址]
   * @param  {[type]}   lnglat   [经纬度]
   */
  getAddressByLatLng(lnglat) {
    return new Promise(function(resolve, reject) {
      AMap.plugin('AMap.Geocoder', function() {
        const geocoder = new AMap.Geocoder();
        geocoder.getAddress([lnglat.lng, lnglat.lat], function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            const res = result.regeocode.addressComponent;
            const response = {
              'township' : res.township||'',
              'street' : res.street||'',
              'streetNumber' : res.streetNumber||''
            }
            resolve(response);
          } else {
            reject(response);
          }
        });
      });
    });
  },
  /**
   * [searchPlace 高德地址联想]
   * @param  {[type]}   city     [城市名]
   * @param  {[type]}   key      [联想关键字]
   */
  searchAmap(city, key) {
    return new Promise(function(resolve, reject) {
      AMap.plugin('AMap.Autocomplete', function(){
        // 实例化Autocomplete
        const autoOptions = {
          //city 限定城市
          city,
          citylimit: true, // 强制在设置的城市内搜索
        }
        const autoComplete= new AMap.Autocomplete(autoOptions);
        autoComplete.search(key, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            const poiList = result.tips.filter(function(poi) {
              // 过滤公交站和地铁站
              return !(poi.name.indexOf("公交站") >
                -1 || poi.name.indexOf("地铁站") > -1 || !poi.location || poi.location == "")
            });
            resolve(poiList);
          } else {
            reject([]);
          }
        })
      })
    });
  },
  /**
   * [searchPlace 高德地址加地址库联想]
   * @param  {[type]}   city     [城市名]]
   * @param  {[type]}   key      [联想关键字]
  */
  searchPlace(city, key) {
    return Promise.all([getApi.searchAmap(city, key), getApi.getAddressFromList(key)])
      .then(([amapList, candaoList]) => {
        let list = candaoList.map((val) => {
          val.name = val.address;
          val.location = {
            lat: val.latitude,
            lng: val.longitude
          };
          return val;
        });
        return list.concat(amapList);
      })
  }
}

export default getApi;