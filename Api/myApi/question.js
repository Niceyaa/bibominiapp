import { MyRequest } from "../MyRequest.js"
// 常见问题接口
export const question = async (data) => {
    const url = '/api/operate/common_problem'
    return await MyRequest(url, data);
}