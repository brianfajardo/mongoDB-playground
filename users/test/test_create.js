const assert = require('assert')
const User = require('../src/model_User')

describe('Creating records', () => {

  it('should save a user', (done) => {
    const brian = new User({ name: 'Brian' })

    brian.save()
      .then(() => {
        assert(brian.isNew === false)
        done()
      })
  })
})
