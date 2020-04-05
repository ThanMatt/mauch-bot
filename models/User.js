const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  mangaSubscribed: {
    type: String,
    required: true
  },
  dateReleased: {
    type: String,
    required: true
  },
  chapters: {
    type: Number,
    required: true
  }
})

const User = mongoose.model('user', userSchema)

module.exports = User
