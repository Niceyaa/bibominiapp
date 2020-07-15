import { MyRequest } from "../MyRequest.js"
// 用户充值
export const reCharge = async (data) => {
    const url = '/api/payment/recharge'
    return await MyRequest(url, data);
}