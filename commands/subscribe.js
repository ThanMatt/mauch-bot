const cheerio = require('cheerio')
const _ = require('lodash')
const request = require('request-promise')
const User = require('../models/User')
const { findRelatedManga } = require('../utils')

module.exports = {
  name: 'subscribe',
  description: 'Subscribes a manga',
  execute(message, title, url, mangaList, primaryColor) {
    serializeTitle = _.kebabCase(_.toLower(title))

    if (title.length <= 2) {
      message.channel.send('Please search with at least 3 characters')
    } else {
      mangaURL = url + '/' + serializeTitle

      request(mangaURL)
        .then((html) => {
          counter = 0
          const $ = cheerio.load(html)
          const anchor = $('#listing tr:last-child a').attr('href')

          latestChapterURL = url + anchor //!! concats the base url with the latest manga chapter url

          $('#listing tr td:last-child').each((i, el) => {
            //!! Counts how many chapters and retrieves the latest date
            counter++
            date = $(el).text()
          })

          User.findOne({
            username: message.author.id,
            mangaSubscribed: title
          })
            .then((currentUser) => {
              if (currentUser) {
                message.channel.send(`You\'ve already subscribed to ${title}`)
              } else {
                new User({
                  username: message.author.id,
                  mangaSubscribed: title.trim(),
                  dateReleased: date,
                  chapters: counter
                })
                  .save()
                  .then((newUser) => {
                    console.log(`User subscribed: ${newUser}`)
                    message.react('✅')
                  })
              }
            })
            .catch((err) => {
              console.log(`MongoDB connection error: ${err}`)
              message.channel.send("Hang on, I'm having a problem")
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
