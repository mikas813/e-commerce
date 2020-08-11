import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: 'string',
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
})

const User = new mongoose.model('User', userSchema)

export default User