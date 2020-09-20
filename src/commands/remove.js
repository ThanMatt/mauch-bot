import User from '../models/User'

module.exports = {
  name: 'remove',
  description: 'Removes a manga from your liked list',
  async execute(message, { manga }) {
    if (!manga) {
      message.channel.send('Enter your liked manga that you want to remove')
    } else {
      const userId = message.author.id

      const currentUser = await User.findOne({ userId })

      if (currentUser) {
        console.log(currentUser)
        const likedManga = currentUser.likedMangas.find(({ title }) => title.toLowerCase() === manga)

        if (likedManga) {
          currentUser.likedMangas = currentUser.likedMangas.filter(({ title }) => title.toLowerCase() !== manga)
          currentUser.save()
          message.react('✅')
        } else {
          message.channel.send(`${manga} is not on your liked list`)
        }
      } else {
        const newUser = new User({ userId: message.author.id })
        newUser.save()
        message.channel.send(`${manga} is not on your liked list`)
      }
    }
  }
}
