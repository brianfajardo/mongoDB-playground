const assert = require('assert')
const User = require('../src/model_User')

describe('Subdocuments', () => {

  it('should create and save a subdocument', (done) => {
    const brian = new User({
      name: 'Brian',
      posts: [{ title: 'Sun and Moon' }],
    })
    brian.save()
      .then(() => User.findOne({ name: 'Brian' }))
      .then((user) => {
        assert(brian.posts[0].title === user.posts[0].title)
        done()
      })
  })

  it('should be able to add new subdocuments to an existing user', (done) => {
    const brian = new User({
      name: 'Brian',
      posts: [],
    })
    brian.save()
      .then(() => User.findOne({ name: 'Brian' }))
      .then((user) => {
        user.posts.push({ title: 'Sun and Moon' })
        return user.save()
      })
      .then(() => User.findOne({ name: 'Brian' }))
      .then((user) => {
        assert(user.posts[0].title === 'Sun and Moon')
        done()
      })
  })

  it('should be able to remove existing subdocuments', (done) => {
    const brian = new User({
      name: 'Brian',
      posts: [{ title: 'Sun and Moon' }],
    })
    brian.save()
      .then(() => User.findOne({ name: 'Brian' }))
      .then((user) => {
        user.posts[0].remove()
        return user.save()
      })
      .then(() => User.findOne({ name: 'Brian' }))
      .then((user) => {
        assert(user.posts.length === 0)
        done()
      })
  })
})
