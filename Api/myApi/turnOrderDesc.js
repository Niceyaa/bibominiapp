import { MyRequest } from "../MyRequest.js"
// 转票操作接口
export const turnOrderDesc = async (data) => {
    const url = '/api/resale/detail/{resale_id}'
    return await MyRequest(url, data);
}
