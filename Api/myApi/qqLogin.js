import { MyRequest } from "../MyRequest.js"
// qq授权登录
export const qqLogin = async (data) => {
    const url = '/api/user/qq_login'
    return await MyRequest(url, data);
}
