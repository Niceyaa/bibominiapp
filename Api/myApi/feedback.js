import { MyRequest } from "../MyRequest.js"
// 意见反馈
export const feedback = async (data) => {
    const url = '/api/operate/feedback'
    return await MyRequest(url, data);
}
