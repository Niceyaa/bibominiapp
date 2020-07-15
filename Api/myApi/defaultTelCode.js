import { MyRequest } from "../MyRequest.js"
// 转票列表接口
export const defaultTelCode = async (data) => {
    const url = '/api/user/send_sms/update_tel'
    return await MyRequest(url, data);
}
