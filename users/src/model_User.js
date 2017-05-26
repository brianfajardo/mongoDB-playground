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
  posts: [postSchema],
})

// postCount will be based on the # of posts in the userSchema.
// postCount will be a virtual type
// getter function with reserved keyword function

userSchema.virtual('postCount').get(function () {
  // this == user instance
  return this.posts.length
})

// Compiling model for mongoose to use with database
const User = mongoose.model('user', userSchema)

module.exports = User
