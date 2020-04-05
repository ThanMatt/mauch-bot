const User = require('../models/User')
module.exports = {
  name: 'mylist',
  description: "Shows the user's subscribed manga list",
  execute(message, primaryColor) {
    let mangaSubscribed = []
    const username = message.author.id
    User.findOne({ username })
      .then((currentUser) => {
        if (currentUser) {
          User.find({ username }).then((mangaList) => {
            mangaList.map((manga) => {
              mangaSubscribed.push(manga.mangaSubscribed)
            })

            message.channel.send({
              embed: {
                color: primaryColor,
                title: 'Your subscribed mangas',
                description: `
                  ${mangaSubscribed.join(`\n`)}
                  `
              }
            })
          })
        } else {
          message.channel.send('You have no subscribed mangas')
        }
      })
      .catch((err) => {
        console.log(`MongoDB connection error: ${err}`)
        message.channel.send("Hang on, I'm having a problem")
      })
  }
}
