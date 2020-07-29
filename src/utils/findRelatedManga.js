import _ from 'lodash'

/**
 * @param {Object[]} mangaList
 * @param {string} title
 */

export default function findRelatedManga(mangaList, title) {
  console.log(title)
  const searches = mangaList.filter((manga) => {
    return (
      manga.indexOf(_.toLower(title)) >= 0 ||
      manga.indexOf(title.replace(/\s/g, '')) >= 0
    )
  })
  return searches
}
// export defaultfindRelatedManga = (mangaList, title) => {}
