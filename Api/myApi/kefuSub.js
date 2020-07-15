import { MyRequest } from "../MyRequest.js"
// 客服问题提交
export const kefuSub = async (data) => {
    const url = '/api/operate/custser_quest'
    return await MyRequest(url, data);
}