const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({ name: String })

// Compiling model for mongoose to use with database
const User = mongoose.model('user', userSchema)

module.exports = User
