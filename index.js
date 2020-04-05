const _ = require('lodash')
const mongoose = require('mongoose')
const Discord = require('discord.js')
const fs = require('fs')
const Guild = require('./models/Guild')
const { notifyIfUpdated, initializeManga } = require('./utils')

const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  reconnectTries: 30,
  reconnectInterval: 500
})

mongoose.connection.once('open', () => {
  console.log('MongoDB connection: Success')
})

client.on('ready', () => {
  console.log(`${client.user.tag} connection: Success`)
  client.user.setActivity('?help', { type: 'PLAYING' })
})

const url = 'https://www.mangareader.net'
const primaryColor = 0x7b6357

// !! Polling for updates
setInterval(() => {
  notifyIfUpdated(url, client)
}, 10000)

let mangaList = []
initializeManga().then((data) => {
  mangaList = data
  client.on('message', async (receivedMessage) => {
    const { guild, author, content } = receivedMessage

    try {
      if (guild) {
        const currentGuild = await Guild.findOne({ guildId: guild.id })

        if (!currentGuild) {
          const newGuild = new Guild({ guildId: guild.id, guildPrefix: '?' })
          newGuild.save()

          console.log(`New guild: ${newGuild}`)

          if (author === client.user) {
            return
          }

          if (content.startsWith('?')) {
            processCommand(receivedMessage)
          }
        } else {
          if (author === client.user) {
            return
          }

          const guildPrefix = currentGuild.guildPrefix

          if (content.startsWith(guildPrefix)) {
            console.log(receivedMessage.content)
            processCommand(receivedMessage)
          }
        }

        // !! For direct messages
      } else {
        if (author === client.user) {
          return
        }

        if (content.startsWith('?')) {
          processCommand(receivedMessage)
        }
      }
    } catch (error) {
      throw new Error(error)
    }
  })
})

const processCommand = (receivedMessage) => {
  const fullCommand = receivedMessage.content.substr(1)
  const primaryCommand = fullCommand.split(' ')[0]
  const phTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Shanghai'
  })
  const status = mongoose.connection.readyState

  if (!fullCommand) {
    receivedMessage.channel.send('no command')
  }

  console.log(
    `[${new Date(phTime)}] ${
      receivedMessage.author.id
    } issued ${primaryCommand} command`
  )

  switch (primaryCommand) {
    case 'manga':
      title = receivedMessage.content.substr(primaryCommand.length + 2)
      client.commands
        .get('manga')
        .execute(receivedMessage, title, url, mangaList, primaryColor)
      break

    case 'subscribe':
      title = receivedMessage.content.substr(primaryCommand.length + 2)
      client.commands
        .get('subscribe')
        .execute(receivedMessage, title, url, mangaList, primaryColor)
      break

    case 'mylist':
      client.commands.get('mylist').execute(receivedMessage, primaryColor)
      break

    case 'remove':
      manga = receivedMessage.content.substr(primaryCommand.length + 2)
      client.commands.get('remove').execute(receivedMessage, manga)
      break

    case 'status':
      console.log(`MongoDB state: ${status}`)
      client.commands.get('status').execute(receivedMessage, status, client)
      break

    case 'help':
      prefix = receivedMessage.content[0]
      client.commands
        .get('help')
        .execute(receivedMessage, primaryColor, prefix, client.commands)
      break

    case 'reset':
      client.commands.get('reset').execute(receivedMessage, client, status)
      break

    case 'mauchPrefix':
      if (receivedMessage.guild) {
        prefix = receivedMessage.content.substr(primaryCommand.length + 2)

        if (prefix.length > 1 || prefix.length < 1) {
          receivedMessage.channel.send(`Must be at least one character long`)
        } else {
          client.commands.get('mauchPrefix').execute(receivedMessage, prefix)
        }
      } else {
        client.users
          .get(receivedMessage.author.id)
          .send(`You're not in a server 😑`)
      }
      break

    default:
      break
  }
}

client.login(process.env.BOT_TOKEN)
