import User from '../models/User'
import { searchManga } from '../utils'

module.exports = {
  name: 'like',
  description: 'Likes a manga',
  async execute(message, { title }) {
    try {
      if (title.length <= 2) {
        message.channel.send('Please enter at least 3 characters')
      } else {
        const manga = await searchManga(title)
        const userId = message.author.id

        if (manga) {
          const currentUser = await User.findOne({ userId })

          if (currentUser) {
            const mangaBody = {
              title: manga.title,
              mangaId: manga.id
            }
            const likedManga = currentUser.likedMangas.find((likedManga) => likedManga.title === manga.title)

            if (likedManga) {
              message.channel.send(`<@${userId}> You've already liked ${manga.title}`)
            } else {
              currentUser.likedMangas = [...currentUser.likedMangas, mangaBody]
              currentUser.save()
              message.react('✅')
            }
          } else {
            const newUser = new User({ userId, likedMangas: [mangaBody] })
            newUser.save()
            message.react('✅')
          }
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
