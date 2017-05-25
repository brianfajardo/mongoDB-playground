const assert = require('assert')
const User = require('../src/model_User')

describe('Read', () => {

  let brian

  beforeEach((done) => {
    brian = new User({ name: 'Brian' })
    brian.save()
      .then(() => done())
  })

  it('should find all users with a name of Brian', (done) => {
    User.find({ name: 'Brian' })
      .then((users) => {
        // _id is an object ID,
        // requires toString for equality comparison
        assert(users[0]._id.toString === brian._id.toString)
        done()
      })
  })
})
