import { MyRequest } from "../MyRequest.js"
// 提现接口
export const transferCash = async (data) => {
    const url = '/api/payment/transfer_cash'
    return await MyRequest(url, data);
}