const _ = require('lodash')
module.exports = findRelatedManga = (mangaList, title) => {
  const searches = mangaList.filter((manga) => {
    return (
      manga.indexOf(_.toLower(title)) >= 0 ||
      manga.indexOf(title.replace(/\s/g, '')) >= 0
    )
  })

  return searches
}
