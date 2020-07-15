import { MyRequest } from "../MyRequest.js"
// 常见问题点赞
export const answerZan = async (data) => {
    const url = '/api/operate/common_problem_zan/{problem_id}'
    return await MyRequest(url, data);
}
