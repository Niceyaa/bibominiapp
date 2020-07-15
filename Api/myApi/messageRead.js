import { MyRequest } from "../MyRequest.js"
//  标记系统消息已阅读
export const messageRead = async (data) => {
    const url = '/api/operate/read_push_msg/{id}/{method?}'
    return await MyRequest(url, data);
}
