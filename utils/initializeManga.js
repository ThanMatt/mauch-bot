const request = require('request-promise')
const cheerio = require('cheerio')
const _ = require('lodash')

module.exports = getMangaList = async () => {
  try {
    const mangaList = []
    const html = await request(`https://www.mangareader.net/alphabetical`)

    let counter = 0
    const $ = cheerio.load(html)

    const mangaItems = $('.series_alpha li')

    mangaItems.each((i, el) => {
      counter++
      mangaList.push(_.toLower($(el).text()))
    })

    console.log('Loading manga: Success')

    return await mangaList
  } catch (error) {
    throw new Error(error)
  }
}
