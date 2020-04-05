module.exports = {
  name: 'help',
  description: 'send help command',
  execute(message, color, prefix) {
    message.channel.send({
      embed: {
        color,
        title: 'Mauch Commands',
        description: `
        **${prefix}manga** \`manga to search\`
        Searches a manga\n
        **${prefix}mylist**
        Lists down your subscribed mangas\n
        **${prefix}prefix** \`prefix\`
        Sets the command prefix for me\n
        **${prefix}remove** \`manga to remove\`
        Removes a manga you subscribed to\n
        **${prefix}subscribe** \`manga to subscribe\`
        Updates you whenever there's a new chapter by sending you a direct message.\n
        `
      }
    })
  }
}
