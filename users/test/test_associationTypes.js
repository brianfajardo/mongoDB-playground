const assert = require('assert')
const User = require('../src/models/User')
const BlogPost = require('../src/models/BlogPost')
const Comment = require('../src/models/Comment')

describe('Association Types', () => {

  let brian
  let blogPost
  let comment

  beforeEach((done) => {
    brian = new User({ name: 'Brian' })
    blogPost = new BlogPost({ title: 'UWO', content: 'White and purple' })
    comment = new Comment({ content: 'Go stangs go!' })

    // Forming associations
    brian.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = brian

    Promise.all([brian.save(), blogPost.save(), comment.save()])
      .then(() => done())
  })

  // Populating query with a modifier.
  // Cannot recursively populate all queries.
  // Can cause crashing if it handles large amounts of data.

  it('should save a relation between a user and a blog post', (done) => {
    User.findOne({ name: 'Brian' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'UWO')
        done()
      })
  })

  it('should save a full relation tree between user, blog posts and comments', (done) => {
    User.findOne({ name: 'Brian' })
      .populate({
        path: 'blogPosts', // Loading nested associations
        populate: {
          path: 'comments',
          model: 'comment', // Compiling model
          populate: {
            path: 'user',
            model: 'user',
          },
        },
      })
      .then((user) => {
        assert(user.name === 'Brian')
        assert(user.blogPosts[0].title === 'UWO')
        assert(user.blogPosts[0].comments[0].content === 'Go stangs go!')
        assert(user.blogPosts[0].comments[0].user.name === 'Brian')
        done()
      })
  })
})
