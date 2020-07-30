import { https } from '../https'
export const myGet = (url) => {
    let cacheToken = uni.getStorageSync("loginToken");
    return uni.request({
        url: https + url + "/about_us", //仅为示例，并非真实接口地址。
        method: "GET",
        header: {
			"Content-Type": "application/x-www-form-urlencoded",
            TOKEN: cacheToken
        }
    });
}