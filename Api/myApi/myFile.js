import { https } from '../https'
export const myFile = (url, data) => {
    let cacheToken = uni.getStorageSync("loginToken");
    return uni.request({
        url: https + url, //仅为示例，并非真实接口地址。
        data: data,
        method: "POST",
        header: {
            "Content-Type": "multipart/form-data",
            TOKEN: cacheToken
        }
    });
}