import cheerio from 'cheerio'
import _ from 'lodash'
import request from 'request-promise'
import User from '../models/User'

/**
 * @param {string} url
 * @param {Object} client
 */
export default async function notifyIfUpdated(url, client) {
  try {
    const users = await User.find({})

    users.forEach((user) => {
      user.subscribedMangas.forEach(async (manga) => {
        const serializeTitle = _.kebabCase(_.toLower(manga.title))
        const mangaUrl = url + '/' + serializeTitle

        const html = await request(mangaUrl)
        let counter = 0

        const $ = cheerio.load(html)
        const anchor = $('#listing tr:last-child a').attr('href')

        // !! concats the base url with the latest manga chapter url
        const latestChapterURL = url + anchor

        $('#listing tr td:last-child').each((i, el) => {
          //!! Counts how many chapters and retrieves the latest date
          counter++
          date = $(el).text()
        })

        if (manga.dateReleased !== date || manga.chapters !== counter) {
          client.users.cache
            .get(user.username)
            .send(
              `New ${_.startCase(manga.title)} chapter!\n${latestChapterURL}`
            )

          user.subscribedMangas = user.subscribedMangas.map(
            (subscribedManga) => {
              if (subscribedManga.title === manga.title) {
                return {
                  ...subscribedManga._doc,
                  dateReleased: date,
                  chapters: counter
                }
              }
              return subscribedManga
            }
          )
          user.save()
        }
      })
    })
  } catch (error) {
    throw new Error(error)
  }
}
