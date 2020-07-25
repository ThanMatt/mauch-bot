const cheerio = require('cheerio')
const _ = require('lodash')
const request = require('request-promise')
const { findRelatedManga, searchManga } = require('../utils')

module.exports = {
  name: 'manga',
  description: 'Checks the info of the specified manga',
  async execute(message, title, url, mangaList, primaryColor) {
    if (title.length <= 2) {
      message.channel.send('Please enter at least 3 characters')
    } else {
      const manga = searchManga(title)

      if (manga.length) {
        message.channel.send(manga[0].attributes.canonicalName)
      }

      // serializeTitle = _.kebabCase(_.toLower(title))
      // mangaURL = url + '/' + serializeTitle
      // request(mangaURL)
      //   .then((html) => {
      //     counter = 0
      //     const $ = cheerio.load(html)
      //     const thumbnail = $('#mangaimg img').attr('src')
      //     const anchor = $('#listing tr:last-child a').attr('href')
      //     latestChapterURL = url + anchor //!! concats the base url with the latest manga chapter url
      //     $('#listing tr td:last-child').each((i, el) => {
      //       //!! Counts how many chapters and retrieves the latest date
      //       counter++
      //       date = $(el).text()
      //     })
      //     message.channel.send({
      //       embed: {
      //         color: primaryColor,
      //         thumbnail: {
      //           url: thumbnail
      //         },
      //         title: _.startCase(title),
      //         description: `
      //         Manga URL: ${mangaURL}
      //         Chapters loaded: ${counter}
      //         Latest chapter date: ${date}
      //         Latest chapter URL: ${latestChapterURL}
      //         `
      //       }
      //     })
      //   })
      //   .catch((err) => {
      //     if (err.statusCode === 404) {
      //       const relatedSearch = findRelatedManga(mangaList, title)
      //       if (relatedSearch.length) {
      //         message.channel.send({
      //           embed: {
      //             color: primaryColor,
      //             title: 'Did you mean',
      //             description: `
      //             ${relatedSearch.join('\n')}
      //             `
      //           }
      //         })
      //       } else {
      //         message.channel.send('No manga found')
      //       }
      //     }
      //   })
    }
  }
}
