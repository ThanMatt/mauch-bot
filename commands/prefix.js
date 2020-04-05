const Guild = require('../models/Guild')

module.exports = {
  name: 'prefix',
  description: 'Changes the prefix for a server',
  async execute(message, assignedPrefix) {
    try {
      if (message.guild) {
        const guild = await Guild.findOneAndUpdate(
          { guildId: message.guild.id },
          {
            guildPrefix: assignedPrefix
          }
        )
        console.log(`Changed prefix into ${assignedPrefix}`)
        console.log(guild)
        message.react('✅')
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
