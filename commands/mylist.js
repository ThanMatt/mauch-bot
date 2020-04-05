const User = require('../models/User')
module.exports = {
  name: 'mylist',
  description: "Shows the user's subscribed manga list",
  async execute(message, primaryColor) {
    const username = message.author.id

    try {
      const currentUser = await User.findOne({ username })

      if (currentUser) {
        if (currentUser.subscribedMangas.length) {
          const mangaTitles = currentUser.subscribedMangas.map(
            (manga) => manga.title
          )
          message.channel.send({
            embed: {
              color: primaryColor,
              title: 'Your subscribed mangas',
              description: `
                ${mangaTitles.join(`\n`)}
                `
            }
          })
        } else {
          message.channel.send('You have no subscribed mangas')
        }
      } else {
        const newUser = new User({ username })
        newUser.save()
        message.channel.send('You have no subscribed mangas')
      }
    } catch (error) {
      console.log(`MongoDB connection error: ${error}`)
      message.channel.send("Hang on, I'm having a problem")
    }
  }
}
