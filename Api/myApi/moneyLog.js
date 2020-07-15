import { MyRequest } from "../MyRequest.js"
// 资金记录
export const moneyLog = async (data) => {
    const url = '/api/operate/money_logs'
    return await MyRequest(url, data);
}
