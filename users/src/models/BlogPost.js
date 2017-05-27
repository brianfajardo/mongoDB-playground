const mongoose = require('mongoose')

const { Schema } = mongoose

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    // Associate with compile refs (mongoose)
    type: Schema.Types.ObjectId,
    ref: 'comment',
  }],
})

const BlogPost = mongoose.model('blogPost', BlogPostSchema)

module.exports = BlogPost
