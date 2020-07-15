import { MyRequest } from "../MyRequest.js"
// 收货地址列表
export const phoneCodeLogin = async (data) => {
    const url = '/api/user/tel_login'
    return await MyRequest(url, data);
}