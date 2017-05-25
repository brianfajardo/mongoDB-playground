const assert = require('assert')
const User = require('../src/model_User')

describe('Create', () => {

  it('should save a user', (done) => {
    const brian = new User({ name: 'Brian' })
    brian.save()
      .then(() => {
        // .isNew flag === true when saved in Mongoose
        // .isNew flag === false when saved in database
        assert(brian.isNew === false)
        done()
      })
  })
})
