import { MyRequest } from "../MyRequest.js"
// 系统推送消息是否有未阅读
export const messageYesNo = async (data) => {
    const url = '/api/operate/push_msg_num'
    return await MyRequest(url, data);
}
