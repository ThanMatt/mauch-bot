const API = require('../config/axios')
/**
 * @param {string} title
 */
module.exports = searchManga = async (title) => {
  serializeTitle = title.replace(/\s/g, '%20')
  const { data } = await API.get(`manga?filter[text]=${serializeTitle}`)
  console.log(data.data)

  return data.data
}
