import { MyRequest } from "../MyRequest.js"
// 系统消息
export const message = async (data) => {
    const url = '/api/operate/push_msgs/{type}'
    return await MyRequest(url, data);
}
