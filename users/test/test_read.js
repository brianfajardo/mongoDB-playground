const assert = require('assert')
const User = require('../src/models/User')

describe('Read', () => {

  let brian
  let melanie
  let joe
  let alex

  beforeEach((done) => {
    brian = new User({ name: 'Brian' })
    melanie = new User({ name: 'Melanie' })
    joe = new User({ name: 'Joe' })
    alex = new User({ name: 'Alex' })

    Promise.all([melanie.save(), alex.save(), brian.save(), joe.save()])
      .then(() => done())
  })

  it('should find all users with a name of Brian', (done) => {
    User.find({ name: 'Brian' }) // Returns an array
      .then((users) => {
        // _id is an object ID,
        // requires toString for equality comparison
        assert(users[0]._id.toString === brian._id.toString)
        done()
      })
  })

  it('should find a user with a specific id', (done) => {
    // Note: Mongoose handles _id conversion
    User.findOne({ _id: brian._id })
      .then((user) => {
        assert(user.name === 'Brian')
        done()
      })
  })

  // 1 (key/value pair) === sort by ascending
  // -1 (key/value pair) === sort by descending

  it('should sort, skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(0)
      .limit(2)
      .then((users) => {
        assert(users.length === 2)
        assert(users[0].name === 'Alex')
        assert(users[1].name === 'Brian')
        done()
      })
  })
})
