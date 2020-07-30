import cheerio from 'cheerio'
import _ from 'lodash'
import request from 'request-promise'
import { findRelatedManga, searchManga } from '../utils'
import Discord from 'discord.js'

module.exports = {
  name: 'manga',
  description: 'Checks the info of the specified manga',
  async execute(message, title, url, mangaList, primaryColor) {
    if (title.length <= 2) {
      message.channel.send('Please enter at least 3 characters')
    } else {
      const manga = await searchManga(title)

      if (manga) {
        console.log(manga)
        const embedMessage = new Discord.MessageEmbed()
          .setColor('#7b6357')
          .setTitle(manga.title)
          .setURL(manga.kitsuUrl)
          .setThumbnail(manga.posterImage)
          .addFields(
            { name: 'Synopsis:', value: manga.synopsis },
            { name: 'Chapters:', value: manga.chapters }
          )
          .setTimestamp(manga.updatedAt)
          .setFooter('Last updated')
        message.channel.send(embedMessage)
      }
    }
  }
}
