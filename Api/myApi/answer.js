import { myAnswer } from "./myAnswer.js"
// 常见问题答案
export const answer = async (data) => {
    const url = '/api/operate/common_problem_answer';
    return await myAnswer(url, data);
}
