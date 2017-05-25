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

// Clear database then begin next test
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => done())
})
