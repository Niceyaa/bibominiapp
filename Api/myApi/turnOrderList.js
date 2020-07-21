import { myAnswer } from "./myAnswer.js"
// 转票列表接口
export const turnOrderList = async (data) => {
    const url = '/api/resale/status_list'
    return await myAnswer(url, data);
}
