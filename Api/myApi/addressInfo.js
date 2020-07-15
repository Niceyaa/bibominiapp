import { MyRequest } from "../MyRequest.js"
// 详细收货地址信息
export const addressInfo = async (data) => {
    const url = '/api/user/addr_info'
    return await MyRequest(url, data);
}