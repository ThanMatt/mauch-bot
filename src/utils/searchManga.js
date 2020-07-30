import { axios } from '../config'
/**
 * @param {string} title
 */
export default async function (title) {
  const serializeTitle = title.replace(/\s/g, '%20')
  const { data } = await axios.get(`manga?filter[text]=${serializeTitle}`)

  if (data.data.length) {
    return {
      title: data.data[0].attributes.canonicalTitle,
      synopsis: data.data[0].attributes.synopsis,
      posterImage: data.data[0].attributes.posterImage.original,
      kitsuUrl: data.data[0].links.self,
      updatedAt: data.data[0].attributes.updatedAt,
      createdAt: data.data[0].attributes.createdAt,
      chapters: data.data[0].attributes.chaptersCount || 0
    }
  }
  return null
}
