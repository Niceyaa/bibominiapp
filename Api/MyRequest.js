import { https } from './https'
export const MyRequest = (url, data) => {
	if(uni.getStorageSync("loginToken")){
		var cacheToken = uni.getStorageSync("loginToken");
	}else{
		var cacheToken = null;
	}
    return uni.request({
        url: https + url, //仅为示例，并非真实接口地址。
        data: data,
        method: "POST",
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
            TOKEN: cacheToken
        }
    });
}



