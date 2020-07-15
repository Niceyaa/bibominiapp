import { MyRequest } from "../MyRequest.js"
// 更新用户信息
export const updateUserInfo = async (data) => {
    const url = '/api/user/update_info'
    return await MyRequest(url, data);
}
