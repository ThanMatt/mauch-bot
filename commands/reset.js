const mongoose = require('mongoose')

export default {
  name: 'reset',
  description:
    'resets database connection attempt (only works if disconnected)',
  execute(message, client, status) {
    if (message.author.id === process.env.DISCORD_USER) {
      if (!status) {
        mongoose.connect(appKeys.mongo.token, {
          useNewUrlParser: true,
          useFindAndModify: false
        })

        client.users
          .get(process.env.DISCORD_USER)
          .send('Roger! Initiating db connection attempt. Please wait')

        setTimeout(() => {
          if (!mongoose.connection.readyState) {
            message.react('❌')
          } else {
            message.react('✅')
          }
        }, 5000)
        console.log('Connection restart')
      } else {
        client.users
          .get(process.env.DISCORD_USER)
          .send('Sir, the database is already connected! No need to restart')
      }
    } else {
      return
    }
  }
}
