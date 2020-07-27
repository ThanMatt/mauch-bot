import Guild from '../models/Guild'

module.exports = {
  name: 'dad',
  description: 'enables/disables infamous dad joke',
  async execute(message) {
    try {
      if (message.guild) {
        const guild = await Guild.findOne({ guildId: message.guild.id })

        guild.dadJokeEnabled = !guild?.dadJokeEnabled
        guild.save()
        message.channel.send(
          `Dad joke ${guild.dadJokeEnabled ? 'enabled' : 'disabled'}`
        )
      }
    } catch (error) {
      throw error
    }
  }
}
