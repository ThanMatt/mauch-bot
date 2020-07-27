import cheerio from 'cheerio'
import _ from 'lodash'
import request from 'request-promise'
import { findRelatedManga } from '../utils'

const command = {
  name: 'manga',
  description: 'Checks the info of the specified manga',
  execute(message, title, url, mangaList, primaryColor) {
    console.log('title', title)
    if (title.length <= 2) {
      message.channel.send('Please enter at least 3 characters')
    } else {
      serializeTitle = _.kebabCase(_.toLower(title))
      mangaURL = url + '/' + serializeTitle

      request(mangaURL)
        .then((html) => {
          counter = 0
          const $ = cheerio.load(html)
          const thumbnail = $('#mangaimg img').attr('src')
          const anchor = $('#listing tr:last-child a').attr('href')

          latestChapterURL = url + anchor //!! concats the base url with the latest manga chapter url

          $('#listing tr td:last-child').each((i, el) => {
            //!! Counts how many chapters and retrieves the latest date
            counter++
            date = $(el).text()
          })

          message.channel.send({
            embed: {
              color: primaryColor,
              thumbnail: {
                url: thumbnail
              },
              title: _.startCase(title),
              description: `
              Manga URL: ${mangaURL}
              Chapters loaded: ${counter}
              Latest chapter date: ${date}
              Latest chapter URL: ${latestChapterURL}
              `
            }
          })
        })
        .catch((err) => {
          if (err.statusCode === 404) {
            const relatedSearch = findRelatedManga(mangaList, title)

            if (relatedSearch.length) {
              message.channel.send({
                embed: {
                  color: primaryColor,
                  title: 'Did you mean',
                  description: `
                  ${relatedSearch.join('\n')} 
                  `
                }
              })
            } else {
              message.channel.send('No manga found')
            }
          }
        })
    }
  }
}

export { command }
