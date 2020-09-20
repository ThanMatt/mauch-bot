module.exports = {
  name: 'help',
  description: 'Send help command',
  execute(message, { color, prefix, commands }) {
    const tips = commands
      .filter((command) => command.name !== 'reset' && command.name !== 'status')
      .map((command) => {
        if (command.name === 'like' || command.name === 'manga' || command.name === 'remove') {
          return `**${prefix}${command.name}** \`manga\` \n${command.description}`
        }

        if (command.name === 'mauchPrefix') {
          return `**${prefix}${command.name}** \`prefix\` \n${command.description}`
        }
        return `**${prefix}${command.name}** \n${command.description}`
      })
    message.channel.send({
      embed: {
        color,
        title: 'Mauch Commands',
        description: `
        ${tips.join(`\n\n`)}
        `
      }
    })
  }
}
