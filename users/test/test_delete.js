const assert = require('assert')
const User = require('../src/model_User')

describe('Delete', () => {

  let brian

  beforeEach((done) => {
    brian = new User({ name: 'Brian' })
    brian.save()
      .then(() => done())
  })

  function assertDeletion(method, done) {
    method
      .then(() => User.findOne({ name: 'Brian' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  }

  it('should delete the specific user instance', (done) => {
    assertDeletion(brian.remove(), done)
  })

  it('should delete all users in the class which meets query', (done) => {
    assertDeletion(User.remove({ name: 'Brian' }), done)
  })

  it('should delete the first user found', (done) => {
    assertDeletion(User.findOneAndRemove({ name: 'Brian' }), done)
  })

  it('should delete the user found only by ID', (done) => {
    assertDeletion(User.findByIdAndRemove({ _id: brian._id }), done)
  })
})
