module.exports = {
  name: 'status',
  description: 'check bot status',
  execute(message, status, client) {
    switch (status) {
      case 0:
        message.channel.send(
          'Disconnected from the server. Let me contact Thanmatt uwu'
        )
        client.users
          .get('140940695119724544')
          .send(
            `SIR!!!!!!! there's something wrong with the database connection!`
          )
        break
      case 1:
        message.channel.send("I'm fine :^)")
        break
      case 2:
        message.channel.send("I'm connecting...")
        break
      case 3:
        message.channel.send("I'm disconnecting...")
        break
      default:
        message.channel.send("I don't know actually...")
        break
    }
  }
}
