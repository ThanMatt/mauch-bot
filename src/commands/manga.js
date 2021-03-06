import { searchManga } from '../utils'
import Discord from 'discord.js'
import { reactionCollector } from '../utils'
import User from '../models/User'

module.exports = {
  name: 'manga',
  description: 'Checks the info of the specified manga',
  async execute(message, { title }) {
    try {
      if (title.length <= 2) {
        message.channel.send('Please enter at least 3 characters')
      } else {
        const manga = await searchManga(title)

        if (manga) {
          console.log(manga)
          const emoji = '💗'
          const embedMessage = new Discord.MessageEmbed()
            .setColor('#7b6357')
            .setTitle(manga.title)
            .setURL(manga.kitsuUrl)
            .setThumbnail(manga.posterImage)
            .addFields(
              { name: 'Synopsis:', value: manga.synopsis },
              { name: 'Chapters:', value: manga.chapters, inline: true },
              { name: 'Average Rating:', value: manga.averageRating ? `${manga.averageRating}%` : 'N/A', inline: true }
            )
            .setFooter('Powered by Kitsu API')

          message.channel.send(embedMessage).then((sentEmbed) => {
            sentEmbed.react(emoji)
            reactionCollector(sentEmbed, emoji, 25000).on('collect', async (_, user) => {
              if (!user.bot) {
                const currentUser = await User.findOne({
                  userId: user.id
                })
                const mangaBody = {
                  title: manga.title,
                  mangaId: manga.id
                }

                if (currentUser) {
                  const likedManga = currentUser.likedMangas.find((likedManga) => likedManga.title === manga.title)

                  if (likedManga) {
                    message.channel.send(`<@${user.id}> You've already liked ${manga.title}`)
                  } else {
                    currentUser.likedMangas = [...currentUser.likedMangas, mangaBody]
                    currentUser.save()
                    message.channel.send(`<@${user.id}> liked ${manga.title}`)
                  }
                } else {
                  const newUser = new User({
                    userId: user.id,
                    likedMangas: [mangaBody]
                  })
                  newUser.save()
                  message.channel.send(`<@${user.id}> liked ${manga.title}`)
                }
              }
            })
          })
        } else {
          message.channel.send('No manga found :(')
        }
      }
    } catch (error) {
      message.channel.send('There was an error. Please try again')
      throw error
    }
  }
}
