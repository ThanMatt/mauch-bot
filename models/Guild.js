const mongoose = require('mongoose')
const Schema = mongoose.Schema

const guildSchema = new Schema({
  guildId: {
    type: String,
    required: true
  },
  guildPrefix: {
    type: String,
    required: true
  }
})

const Guild = mongoose.model('guild', guildSchema)

module.exports = Guild
