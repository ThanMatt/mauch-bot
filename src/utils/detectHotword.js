/**
 * @param {string} content
 */
export const detectHotword = (content) => content.match(/(?:^|\W)(im|i am|i'm)\b.(?:$|\w*){2}/gi)?.length
