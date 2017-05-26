const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters',
    },
    required: [true, 'Name is required'],
  },
  postCount: Number,
})

// Compiling model for mongoose to use with database
const User = mongoose.model('user', userSchema)

module.exports = User
