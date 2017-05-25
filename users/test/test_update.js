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
  it('model instance: set & save', (done) => {
    brian.set('name', 'Marco')
    assertName(brian.save(), done)
  })

  it('model instance: update', (done) => {
    assertName(brian.update({ name: 'Marco' }), done)
  })

  // Batch update
  it('model class: update', (done) => {
    assertName(
      User.update({ name: 'Brian' }, { name: 'Marco' }),
      done
    )
  })

  it('model class: findOneAndUpdate', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Brian' }, { name: 'Marco' }),
      done
    )
  })

  it('model class: findByIdAndUpdate', (done) => {
    assertName(
      User.findByIdAndUpdate(brian._id, { name: 'Marco' }),
      done
    )
  })
})
