import { MyRequest } from "../MyRequest.js"
// 发送短信验证码
export const sendCode = async (data) => {
    const url = '/api/user/send_sms'
    return await MyRequest(url, data);
}