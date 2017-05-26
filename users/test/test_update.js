const assert = require('assert')
const User = require('../src/model_User')

describe('Update', () => {

  let brian

  beforeEach((done) => {
    brian = new User({ name: 'Brian' })
    brian.save()
      .then(() => done())
  })

  function assertName(method, done) {
    method
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1)
        assert(users[0].name === 'Marco')
        done()
      })
  }

  // set persists only in memory
  it('should "set" and "save" a property on the user instance', (done) => {
    brian.set('name', 'Marco')
    assertName(brian.save(), done)
  })

  it('should update a property on the user instance', (done) => {
    assertName(brian.update({ name: 'Marco' }), done)
  })

  it('should update all users on the class that fits query', (done) => {
    assertName(
      User.update({ name: 'Brian' }, { name: 'Marco' }),
      done
    )
  })

  it('should update the first user that meets the query', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Brian' }, { name: 'Marco' }),
      done
    )
  })

  it('should update the user found only by ID', (done) => {
    assertName(
      User.findByIdAndUpdate(brian._id, { name: 'Marco' }),
      done
    )
  })
})
