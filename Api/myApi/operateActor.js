import { MyRequest } from "../MyRequest.js"
// 添加、删除艺人收藏
export const operateActor = async (data) => {
    const url = '/api/operate/favor/actor/{opt}'
    return await MyRequest(url, data);
}
