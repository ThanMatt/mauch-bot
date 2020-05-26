/**
 * @param {string} content
 */

module.exports = detectHotword = (content) => {
  return content.match(/(im|i am|i'm)\b.\w{2}/gi)?.length
}
