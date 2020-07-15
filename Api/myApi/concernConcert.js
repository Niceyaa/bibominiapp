import { MyRequest } from "../MyRequest.js"
// 关注的演出列表接口
export const concernConcert = async (data) => {
    const url = '/api/operate/favor_list/concert'
    return await MyRequest(url, data);
}
