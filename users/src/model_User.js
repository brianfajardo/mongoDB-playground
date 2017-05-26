const mongoose = require('mongoose')
const postSchema = require('./schema_post')

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
  posts: [postSchema],
})

// Compiling model for mongoose to use with database
const User = mongoose.model('user', userSchema)

module.exports = User
