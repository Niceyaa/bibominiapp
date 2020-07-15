import { MyRequest } from "../MyRequest.js"
// 转票操作接口
export const handleTel = async (data) => {
    const url = '/api/miniapp/handle_tel'
    return await MyRequest(url, data);
}
