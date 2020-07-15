import { MyRequest } from "../MyRequest.js"
// 小程序授权手机号
export const miniTel = async (data) => {
    const url = '/api/miniapp/bind_tel'
    return await MyRequest(url, data);
}