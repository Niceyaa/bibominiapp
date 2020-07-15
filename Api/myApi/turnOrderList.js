import { MyRequest } from "../MyRequest.js"
// 转票列表接口
export const turnOrderList = async (data) => {
    const url = '/api/resale/status_list/{status}'
    return await MyRequest(url, data);
}
