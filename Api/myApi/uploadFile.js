import { MyRequest } from "../MyRequest.js"
// 上传文件
export const uploadFile = async (data) => {
    const url = '/api/operate/comm_upload/{type}'
    return await MyRequest(url, data);
}