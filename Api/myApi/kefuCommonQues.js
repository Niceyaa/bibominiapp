import { MyRequest } from "../MyRequest.js"
// 客服常见问题接口
export const kefuCommonQues = async (data) => {
    const url = '/api/operate/custser_list/common'
    return await MyRequest(url, data);
}