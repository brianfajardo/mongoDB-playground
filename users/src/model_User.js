const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  name: String,
})

// User represents the entire collection of data
const User = mongoose.model('user', userSchema)

module.exports = User
