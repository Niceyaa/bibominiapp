import { MyRequest } from "../MyRequest.js"
// 订单操作，删除，取消，确认收货
export const orderOperate = async (data) => {
    const url = '/api/order/update/{order_id}/{status}'
    return await MyRequest(url, data);
}
