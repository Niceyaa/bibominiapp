import { MyRequest } from "../MyRequest.js"
// 支付下单接口
export const payOrder = async (data) => {
    const url = '/api/payment/unifiedorder'
    return await MyRequest(url, data);
}