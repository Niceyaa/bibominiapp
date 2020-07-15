import { MyRequest } from "../MyRequest.js"
// 微信授权登录
export const qqLogin = async (data) => {
    const url = '/api/user/wechat_login'
    return await MyRequest(url, data);
}
