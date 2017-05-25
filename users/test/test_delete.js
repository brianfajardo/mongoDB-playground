const assert = require('assert')
const User = require('../src/model_User')

describe('Delete', () => {

  let brian

  beforeEach((done) => {
    brian = new User({ name: 'Brian' })
    brian.save()
      .then(() => done())
  })

  // Specific delete on model instance
  it('model instance remove', (done) => {
    brian.remove()
      .then(() => User.findOne({ name: 'Brian' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  // Batch delete on User class
  it('class method remove', (done) => {
    User.remove({ name: 'Brian' })
      .then(() => User.findOne({ name: 'Brian' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  // Search by query and remove
  // first record that matches criteria
  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Brian' })
      .then(() => User.findOne({ name: 'Brian' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove({ _id: brian._id })
      .then(() => User.findOne({ name: 'Brian' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })
})
