const cheerio = require('cheerio')
const _ = require('lodash')
const request = require('request-promise')
const User = require('../models/User')

module.exports = notifyIfUpdated = async (url, client) => {
  try {
    const users = await User.find({})

    users.forEach((user) => {
      user.subscribedMangas.forEach(async (manga) => {
        serializeTitle = _.kebabCase(_.toLower(manga.title))
        mangaUrl = url + '/' + serializeTitle

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
