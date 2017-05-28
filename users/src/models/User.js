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
  blogPosts: [{
    // Associate type with compile refs
    type: Schema.Types.ObjectId,
    ref: 'blogPost',
  }],
})

// postCount will be based on the # of posts in the userSchema.
// postCount will be a virtual type.
// getter function with reserved keyword function

UserSchema.virtual('postCount').get(function virtualPostCount() {
  // this === user instance
  // fat arrow would make `this` === this file
  return this.posts.length
})

// The $in operator selects the documents where the value
// of a field equals any value in the specified array.

UserSchema.pre('remove', function preRemove(next) {
  // Dealing with cyclic requires
  const BlogPost = mongoose.model('blogPost')

  // Look at BlogPost collection and if a blog posts' _id
  // exists in this.blogPosts (array), remove it from collection

  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next())
})

// Compiling model for mongoose to use with database
const User = mongoose.model('user', UserSchema)

module.exports = User
