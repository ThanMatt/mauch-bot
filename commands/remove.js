const User = require('../models/User')

module.exports = {
  name: 'remove',
  description: 'removes a specified manga in your susbcriptions',
  execute(message, manga) {
    if (!manga) {
      message.channel.send(
        'Enter your subscribed manga that you want to remove'
      )
    } else {
      username = message.author.id

      User.findOneAndDelete({ username, mangaSubscribed: manga })
        .then((currentUser) => {
          if (currentUser) {
            message.react('✅')
          } else {
            message.channel.send(`You\'re not subscribed to ${manga}`)
          }
        })
        .catch((err) => {
          console.log(`MongoDB connection error: ${err}`)
          message.channel.send("Hang on, I'm having a problem")
        })
    }
  }
}
