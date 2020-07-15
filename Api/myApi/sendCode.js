import { MyRequest } from "../MyRequest.js"
// 支付下单接口
export const sendCode = async (data) => {
    const url = '/api/user/send_sms'
    return await MyRequest(url, data);
}