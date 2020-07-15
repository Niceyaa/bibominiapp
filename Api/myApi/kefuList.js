import { MyRequest } from "../MyRequest.js"
// 客服问题接口
export const kefuList = async (data) => {
    const url = '/api/operate/custser_list'
    return await MyRequest(url, data);
}