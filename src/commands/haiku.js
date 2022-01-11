import Guild from '../models/Guild'

module.exports = {
  name: 'haiku',
  description: 'enables/disables haiku maker',
  async execute(message) {
    try {
      if (message.guild) {
        const guild = await Guild.findOne({ guildId: message.guild.id })

        guild.haikuMakerEnabled = !guild?.haikuMakerEnabled
        guild.save()
        message.channel.send(`Haiku maker ${guild.haikuMakerEnabled ? 'enabled' : 'disabled'}`)
      }
    } catch (error) {
      throw error
    }
  }
}
