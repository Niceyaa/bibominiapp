import { MyRequest } from "../MyRequest.js"
// 添加、删除演出收藏
export const concertOperate = async (data) => {
    const url = '/api/operate/favor/concert'
    return await MyRequest(url, data);
}
