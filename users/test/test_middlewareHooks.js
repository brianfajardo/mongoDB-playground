const assert = require('assert')
const User = require('../src/models/User')
const BlogPost = require('../src/models/BlogPost')

describe('Middleware Hooks', () => {

  let brian
  let blogPost

  beforeEach((done) => {
    brian = new User({ name: 'Brian' })
    blogPost = new BlogPost({ title: 'UWO', content: 'White and purple' })
    // Forming associations
    brian.blogPosts.push(blogPost)
    Promise.all([brian.save(), blogPost.save()])
      .then(() => done())
  })

  it('should remove users\' blog posts on user delete', (done) => {
    brian.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0)
        done()
      })
  })
})
