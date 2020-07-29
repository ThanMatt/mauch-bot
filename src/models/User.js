const Schema = mongoose.Schema
import mongoose from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  subscribedMangas: [
    {
      title: {
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
    }
  ]
})

const User = mongoose.model('user', userSchema)

export default User
