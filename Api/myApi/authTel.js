import { MyRequest } from "../MyRequest.js"
// 小程序手机授权
export const authTel = async (data) => {
    const url = '/api/miniapp/bind_tel'
    return await MyRequest(url, data);
}