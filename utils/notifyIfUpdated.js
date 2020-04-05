const cheerio = require('cheerio')
const _ = require('lodash')
const request = require('request-promise')
const User = require('../models/User')

module.exports = notifyIfUpdated = async (url, client) => {
  try {
    const users = await User.find({})

    users.forEach(async (user) => {
      serializeTitle = _.kebabCase(_.toLower(user.mangaSubscribed))
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

      if (user.dateReleased !== date || user.chapters !== counter) {
        client.users
          .get(user.username)
          .send(
            `New ${_.startCase(
              user.mangaSubscribed
            )} chapter!\n${latestChapterURL}`
          )

        const data = await User.findOneAndUpdate({
          username: user.username,
          mangaSubscribed: user.mangaSubscribed
        })

        console.log(data)
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}
