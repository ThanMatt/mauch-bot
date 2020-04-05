module.exports = processCommand = (receivedMessage) => {
  const fullCommand = receivedMessage.content.substr(1)
  const primaryCommand = fullCommand.split(' ')[0]
  const phTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Shanghai'
  })

  if (!fullCommand) {
    receivedMessage.channel.send('no command')
  }

  console.log(
    `[${new Date(phTime)}] ${
      receivedMessage.author.id
    } issued ${primaryCommand} command`
  )
}
