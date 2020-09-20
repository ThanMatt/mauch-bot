import { axios } from '../config'
/**
 * @param {string} title
 */
export const searchManga = async (title) => {
  try {
    const serializeTitle = title.replace(/\s/g, '%20')
    const { data } = await axios.get(`manga?filter[text]=${serializeTitle}`)

    if (data.data.length) {
      return {
        id: data.data[0].id,
        title: data.data[0].attributes.canonicalTitle || 'N/A',
        synopsis: data.data[0].attributes.synopsis || 'N/A',
        averageRating: data.data[0].attributes.averageRating,
        posterImage: data.data[0].attributes.posterImage.original,
        kitsuUrl: `https://kitsu.io/manga/${data.data[0].attributes.slug}`,
        updatedAt: data.data[0].attributes.updatedAt,
        createdAt: data.data[0].attributes.createdAt,
        chapters: data.data[0].attributes.chaptersCount || 'N/A'
      }
    }
    return null
  } catch (error) {
    throw error
  }
}
