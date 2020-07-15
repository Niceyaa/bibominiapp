import { MyRequest } from "../MyRequest.js"
// 收货地址列表
export const addressList = async (data) => {
    const url = '/api/user/addr_list'
    return await MyRequest(url, data);
}