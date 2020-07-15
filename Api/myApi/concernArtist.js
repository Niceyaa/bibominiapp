import { MyRequest } from "../MyRequest.js"
// 关注的艺人列表
export const concernArtist = async (data) => {
    const url = '/api/operate/favor_list/actor'
    return await MyRequest(url, data);
}