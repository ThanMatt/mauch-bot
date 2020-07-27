import cheerio from 'cheerio'
import _ from 'lodash'
import request from 'request-promise'
import User from '../models/User'
import { findRelatedManga } from '../utils'

module.exports = {
  name: 'subscribe',
  description: 'Subscribes a manga',
  async execute(message, title, url, mangaList, primaryColor) {
    const serializeTitle = _.kebabCase(_.toLower(title))

    try {
      if (title.length <= 2) {
        message.channel.send('Please search with at least 3 characters')
      } else {
        let counter = 0

        const mangaUrl = url + '/' + serializeTitle
        const html = await request(mangaUrl)
        const $ = cheerio.load(html)

        $('#listing tr td:last-child').each((i, el) => {
          //!! Counts how many chapters and retrieves the latest date
          counter++
          date = $(el).text()
        })

        const mangaBody = {
          title: title.trim(),
          dateReleased: date,
          chapters: counter
        }

        const currentUser = await User.findOne({ username: message.author.id })

        if (currentUser) {
          const subscribedManga = currentUser.subscribedMangas.find(
            (manga) => title === manga.title
          )

          if (subscribedManga) {
            message.channel.send(
              `You've already subscribed to ${subscribedManga.title}`
            )
          } else {
            currentUser.subscribedMangas = [
              ...currentUser.subscribedMangas,
              mangaBody
            ]
            currentUser.save()
            message.react('✅')
          }
        } else {
          const newUser = new User({
            username: message.author.id,
            subscribedMangas: [mangaBody]
          })

          newUser.save()
          console.log(`User subscribed: ${newUser}`)
          message.react('✅')
        }
      }
    } catch (error) {
      if (error.statusCode === 404) {
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
    }
  }
}
