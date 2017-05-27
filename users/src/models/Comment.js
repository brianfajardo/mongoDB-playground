const mongoose = require('mongoose')

const { Schema } = mongoose

const CommentSchema = new Schema({
  comment: String,
  user: {
    // Associate with compile refs (mongoose)
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
})

const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment
