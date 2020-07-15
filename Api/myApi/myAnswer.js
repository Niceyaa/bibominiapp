import { https } from '../https'
export const myAnswer = (url, data) => {
    let cacheToken = uni.getStorageSync("loginToken");
    return uni.request({
        url: https + url + "/"+data.prm, //仅为示例，并非真实接口地址。
        method: "POST",
        header: {
			"Content-Type": "application/x-www-form-urlencoded",
            TOKEN: cacheToken
        }
    });
}
