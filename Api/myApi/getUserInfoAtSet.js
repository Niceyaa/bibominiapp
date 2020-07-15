import { MyRequest } from "../MyRequest.js"
// 收货地址列表
export const getUserInfoAtSet = async (data) => {
    const url = '/api/user/user_info'
    return await MyRequest(url, data);
}