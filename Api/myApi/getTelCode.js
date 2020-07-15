import { MyRequest } from "../MyRequest.js"
// 获取手机验证码
export const getTelCode = async (data) => {
    const url = '/api/user/send_sms'
    return await MyRequest(url, data);
}