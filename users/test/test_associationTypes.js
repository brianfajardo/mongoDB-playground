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
    brian.blogPost.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = brian

    done()
  })
})
