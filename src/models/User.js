const Schema = mongoose.Schema
import mongoose from 'mongoose'

const userSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  likedMangas: [
    {
      title: {
        type: String,
        required: true
      },
      mangaId: {
        type: String,
        required: true
      }
    }
  ]
})

const User = mongoose.model('user', userSchema)

export default User
