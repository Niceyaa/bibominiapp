import { MyRequest } from "./MyRequest"
// 转票广场接口
export const resalesquare = async (data) => {
    const url = '/api/resale/resale_square'
    return await MyRequest(url, data);
}
// 求票广场
export const needsquare = async (data) => {
    const url = '/api/resale/need_square'
    return await MyRequest(url, data);
}