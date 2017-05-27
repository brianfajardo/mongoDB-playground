const mongoose = require('mongoose')

// Using ES6 Promise implementation
mongoose.Promise = global.Promise

// Methods provided by Mocha
// before runs only once

before((done) => {
  mongoose.connect('mongodb://localhost/users_test')
  mongoose.connection
    .once('open', () => done())
    .on('error', err => console.log('Error:', err))
})

// Clear each database collection then begin next test.
// Cannot drop multiple collections synchronously.
// Mongoose normalizes camel-cased collections

beforeEach((done) => {
  const { users, blogposts, comments } = mongoose.connection.collections
  users.drop(() => {
    blogposts.drop(() => {
      comments.drop(() => done())
    })
  })
})
