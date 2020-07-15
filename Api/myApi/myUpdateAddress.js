import { https } from '../https'
export const myUpdateAddress = (url,id,data) => {
    let cacheToken = uni.getStorageSync("loginToken");
    return uni.request({
        url: https + url + "/"+id, //仅为示例，并非真实接口地址。
		data:data,
        method: "POST",
        header: {
			"Content-Type": "application/x-www-form-urlencoded",
            TOKEN: cacheToken
        }
    });
}