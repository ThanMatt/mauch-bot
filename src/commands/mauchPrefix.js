import Guild from '../models/Guild'

module.exports = {
  name: 'mauchPrefix',
  description: 'Changes the server prefix',
  async execute(message, { prefix }) {
    try {
      if (message.guild) {
        const guild = await Guild.findOneAndUpdate(
          { guildId: message.guild.id },
          {
            guildPrefix: prefix
          }
        )
        console.log(`Changed prefix into ${prefix}`)
        console.log(guild)
        message.react('✅')
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
