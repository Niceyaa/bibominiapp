import { myAnswer } from "./myAnswer.js"
// 转票操作接口
export const turnOrderDesc = async (data) => {
    const url = '/api/resale/detail/{resale_id}'
    return await myAnswer(url, data);
}
