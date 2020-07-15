import { MyRequest } from "../MyRequest.js"
// 添加收货地址信息
export const updateAddress = async (data) => {
    const url = '/api/user/addr_submit'
    return await MyRequest(url, data);
}