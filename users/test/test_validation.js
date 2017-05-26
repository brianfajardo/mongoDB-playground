const assert = require('assert')
const User = require('../src/models/User')

describe('Validation', () => {

  it('should require the user\'s name', (done) => {
    const newUser = new User({ name: undefined })
    const validationResultObj = newUser.validateSync()
    const { message } = validationResultObj.errors.name

    assert(message === 'Name is required')
    done()
  })

  it('should require the user\'s name to be > 2 characters', (done) => {
    const newUser = new User({ name: 'Jo' })
    const validationResultObj = newUser.validateSync()
    const { message } = validationResultObj.errors.name

    assert(message === 'Name must be longer than 2 characters')
    done()
  })

  it('should not save invalid entries', (done) => {
    const newUser = new User({ name: 'Jo' })

    newUser.save()
      .catch((validationResultObj) => {
        const { message } = validationResultObj.errors.name
        assert(message === 'Name must be longer than 2 characters')
        done()
      })
  })
})
