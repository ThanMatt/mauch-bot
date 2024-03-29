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
  },
  dadJokeEnabled: {
    type: Boolean,
    default: false
  },
  haikuMakerEnabled: {
    type: Boolean,
    default: true
  }
})

const Guild = mongoose.model('guild', guildSchema)

export default Guild
