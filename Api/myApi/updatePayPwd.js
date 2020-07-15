import { MyRequest } from "../MyRequest.js"
// 设置修改支付密码
export const updatePayPwd = async (data) => {
    const url = '/api/user/balance_passwd'
    return await MyRequest(url, data);
}