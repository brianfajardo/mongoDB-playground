const assert = require('assert')
const User = require('../src/model_User')

describe('Virtual Types', () => {

  it('should calculate postCount from the number of posts', (done) => {
    const brian = new User({
      name: 'Brian',
      posts: [{ title: 'Thunder and lightning very very frightening' }],
    })
    brian.save()
      .then(() => {
        assert(brian.postCount === 1)
        done()
      })
  })
})
