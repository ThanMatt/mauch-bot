import User from '../models/User'

module.exports = {
  name: 'mylist',
  description: "Shows the user's liked manga list",
  async execute(message, primaryColor) {
    const userId = message.author.id

    try {
      const currentUser = await User.findOne({ userId })

      if (currentUser) {
        if (currentUser.likedMangas.length) {
          const mangaTitles = currentUser.likedMangas.map(
            (manga) => manga.title
          )
          message.channel.send({
            embed: {
              color: primaryColor,
              title: 'Your liked mangas',
              description: `
                ${mangaTitles.join(`\n`)}
                `
            }
          })
        } else {
          message.channel.send('You have no liked mangas')
        }
      } else {
        const newUser = new User({ userId })
        newUser.save()
        message.channel.send('You have no liked mangas')
      }
    } catch (error) {
      console.log(`MongoDB connection error: ${error}`)
      message.channel.send("Hang on, I'm having a problem")
    }
  }
}
