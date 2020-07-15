import { myAnswer } from "./myAnswer.js"
// 删除收货地址
export const deleteAddress = async (data) => {
    const url = '/api/user/addr_del'
    return await myAnswer(url, data);
}