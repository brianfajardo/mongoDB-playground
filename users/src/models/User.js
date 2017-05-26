const mongoose = require('mongoose')
const PostSchema = require('../schemas/Post')

const { Schema } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters',
    },
    required: [true, 'Name is required'],
  },
  posts: [PostSchema],
  likes: Number,
})

// postCount will be based on the # of posts in the userSchema.
// postCount will be a virtual type.
// getter function with reserved keyword function

UserSchema.virtual('postCount').get(function () {
  // this == user instance
  return this.posts.length
})

// Compiling model for mongoose to use with database
const User = mongoose.model('user', UserSchema)

module.exports = User
