import { MyRequest } from "../MyRequest.js"
// 转票操作接口
export const turnOrderOperate = async (data) => {
    const url = '/api/resale/update/{resale_id}/{status}'
    return await MyRequest(url, data);
}
