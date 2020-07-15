import { myUpdateAddress } from "./myUpdateAddress.js"
// 更新收货地址信息
export const editAddress = async (id,data) => {
    const url = '/api/user/addr_submit'
    return await myUpdateAddress(url,id,data);
}