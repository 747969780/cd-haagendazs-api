# 文档  #

## 使用方式：

###### javascript标签引入方法，引入后生成一个$candao的变量
```html
<script type="text/javascript" src="./dis/candao-iife.js"></script>
```

###### import模块引入方法
```javascript
import candao from './dist/candao-module.js'
```



## 方法名、用法（下面每个方法返都回一个promise对象）：

<br></br>
### cacheCityNam 
* * *
###### 缓存城市名方法
###### 每次切换城市或者第一次请求都应调用此方法在服务器上缓存城市名，缓存一次就可以使用了，如果切换过城市而没有缓存当前城市，则用的是上一次的城市名
###### 例子
```javascript
const city = '广州市';
cacheCityName(city)
	.then((res) => {
      // 成功
	})
	.catch((res) => {
      // 失败
	})
```

###### 参数说明

| 参数   |  说明  |   类型   |    默认值    | 是否必传 |
| :--- | :--: | :----: | :-------: | :--: |
| city | 城市名  | string | undefined | true |

###### 返回值

| 参数         |       说明       |   类型   |
| :--------- | :------------: | :----: |
| msg        |     返回的信息      | String |
| serverTime |     服务器时间      | String |
| status     | 状态 1、成功 ，其他为失败 | String |

<br></br>
### getNearestStore
* * *
######  获取最近一家门店
######  根据经纬度和地址获取最近的一家门店
###### 例子
```javascript
cacheCityName('北京市');
const lng = 116.473083,
	lat = 39.993762,
	address = '朝阳区阜荣街10号',
	businessType =  [1,2,3,4];
getNearestStore(lng, lat, address, businessType)
	.then((res) => {
      // 成功
	})
	.catch((error) => {
      // 失败
	})
```

###### 参数说明

| 参数           |             说明             |   类型   |    默认值    | 是否必传  |
| :----------- | :------------------------: | :----: | :-------: | :---: |
| lng&lat      |            经纬度             | Number | undefined | true  |
| address      |             地址             | String | undefined | true  |
| businessType | 业务类型 1、外卖 2、自取 3、堂食 4、外卖预约 | Array  | [1,2,3,4] | false |

###### 返回值
| 参数        |      说明      |   类型   |
| :-------- | :----------: | :----: |
| cityName  |     城市名      | String |
| district  |      区名      | String |
| address   |     门店地址     | String |
| brandName |     品牌名称     | String |
| storeName |     门店名称     | String |
| extId     |   第三方门店id    | Number |
| distance  | 门店与传过来的经纬度距离 | Number |

<br></br>
### getNearStores
***
###### 获取附近门店列表
###### 根据经纬度和地址获取最近的门店列表
###### 例子
```javascript
	cacheCityName('北京市');
	const lng = 116.473083,
		lat = 39.993762,
		address = '朝阳区阜荣街10号',
		businessType =  [1,2,3,4];
	getNearStores(lng, lat, address, businessType)
		.then((res) => {
	      // 成功
		})
		.catch((err) => {
	      // 失败
		})
```

###### 参数说明

| 参数           |             说明             |   类型   |    默认值    | 是否必传  |
| :----------- | :------------------------: | :----: | :-------: | :---: |
| lng&lat      |            经纬度             | Number | undefined | true  |
| address      |             地址             | String | undefined | true  |
| businessType | 业务类型 1、外卖 2、自取 3、堂食 4、外卖预约 | Array  | [1,2,3,4] | false |

###### 返回值
| 参数        |      说明      |   类型   |
| :-------- | :----------: | :----: |
| cityName  |     城市名      | String |
| district  |      区名      | String |
| address   |     门店地址     | String |
| brandName |     品牌名称     | String |
| storeName |     门店名称     | String |
| extId     |   第三方门店id    | Number |
| distance  | 门店与传过来的经纬度距离 | Number |

<br></br>
### getStoreById
***
###### 获取门店信息
###### 根据storeId获取门店信息
###### 例子
```javascript
	cacheCityName('北京市');
	const lng = 116.473083,
		lat = 39.993762,
		address = '朝阳区阜荣街10号',
		businessType = 1;
	getStoreById(storeId, lng, lat, businessType)
		.then((res) => {
	      // 成功
		})
		.catch((err) => {
	      // 失败
		})
```

###### 参数说明

| 参数           |             说明             |   类型   |    默认值    | 是否必传  |
| :----------- | :------------------------: | :----: | :-------: | :---: |
| lng&lat      |            经纬度             | Number | undefined | true  |
| address      |             地址             | String | undefined | true  |
| businessType | 业务类型 1、外卖 2、自取 3、堂食 4、外卖预约 | Number |     1     | false |

###### 返回值
| 参数        |      说明      |   类型   |
| :-------- | :----------: | :----: |
| cityName  |     城市名      | String |
| district  |      区名      | String |
| address   |     门店地址     | String |
| brandName |     品牌名称     | String |
| storeName |     门店名称     | String |
| extId     |   第三方门店id    | Number |
| distance  | 门店与传过来的经纬度距离 | Number |

<br></br>
### getAddressFromList
***
###### 根据关键字联想商家白名单地址库
###### 例子
```javascript
	cacheCityName('北京市');
	getAddressFromList('朝阳区阜荣街10号')
		.then((res) => {
	      // 成功
		})
		.catch(() => {
	      // 失败
		})
```

###### 参数说明

| 参数      |  说明  |   类型   |    默认值    | 是否必传 |
| :------ | :--: | :----: | :-------: | :--: |
| address | 联想地址 | String | undefined | true |
###### 返回值
| 参数            |  说明   |   类型   |
| :------------ | :---: | :----: |
| id            | 白名单Id | Number |
| brandId       | 品牌Id  | Number |
| storeId       | 门店Id  | Number |
| address       |  地址   | String |
| longitude     |  经度   | Number |
| latitude      |  纬度   | Number |
| cityId        | 城市id  | Number |
| brandName     | 品牌名称  | String |
| storeName     | 门店名称  | String |
| platformKey   | 平台key | String |
| deliveryRange | 配送范围  | Object |
| deliveryTimes | 配送时间  | Object |

<br></br>
### getLatLngInfo
***
###### 根据地址查询经纬度
###### 例子
```javascript
	const city = '广州',
		address = '信达大厦';
	getLatLngInfo(city, address)
		.then((res) => {
	      // 成功
		})
		.catch(() => {
	      // 失败
		})
```

###### 参数说明

| 参数      |  说明  |   类型   |    默认值    | 是否必传 |
| :------ | :--: | :----: | :-------: | :--: |
| city    |  城市  | String | undefined | true |
| address |  地址  | String | undefined | true |

###### 返回值

| 参数               |  说明  |   类型   |
| :--------------- | :--: | :----: |
| formattedAddress |  地址  | String |
| district         |  区名  | String |
| lat&lng          | 经纬度  | String |

<br></br>
### getAddressByLatLng
***
###### 根据经纬度获得地址
###### 例子
```javascript
	const lnglat = {
	  lng: 116.473083,
	  lat: 39.993762
	};
	getAddressByLatLng(lnglat)
		.then((res) => {
	      // 成功
		})
		catch(() => {
	      // 失败
		})
```

###### 参数说明

| 参数     |    说明    |   类型   |    默认值    | 是否必传 |
| :----- | :------: | :----: | :-------: | :--: |
| lnglat | 存放经纬度的对象 | Object | undefined | true |

###### 返回值

| 参数           |  说明  |   类型   |
| :----------- | :--: | :----: |
| township     |  乡镇  | String |
| street       |  街道  | String |
| streetNumber | 门牌号  | String |

<br></br>
### searchAmap
***
###### 高德地图的api 地址联想
###### 例子
```javascript
const city = '北京市',
	key = '协和';
searchAmap(city, key)
	.then(poiList) => { console.log(poiList) };
```

###### 参数说明

| 参数   |  说明  |   类型   |    默认值    | 是否必传 |
| :--- | :--: | :----: | :-------: | :--: |
| city | 城市名  | String | undefined | true |
| key  | 关键字  | String | undefined | true |

###### 返回值
[请参阅此链接，高德地图的输入提示](https://lbs.amap.com/api/javascript-api/guide/services/autocomplete)

<br></br>
### searchPlace
###### 商家白名单地址库和高德地址联想
###### 调用searchAmap和getAddressFromList方法，得到结果后返回结果，商家地址库在前（不为空），高德联想地址在后
###### 例子
```javascript
	const city = '广州市',
			key = '信达大厦';
	searchPlace(city, key)
		.then((res) => {
			// res 包含了商家白名单地址库和高德地址联想两种数据
			// 成功
		})
		.catch((err) => {
	    	// 失败
		})
```

###### 参数说明

| 参数   |  说明  |   类型   |    默认值    | 是否必传 |
| :--- | :--: | :----: | :-------: | :--: |
| city | 城市名  | String | undefined | true |
| key  | 关键字  | String | undefined | true |

###### 返回值

为一个数组， 由getAddressFromList 和 searchAmap 两个方法的返回值组成的数据