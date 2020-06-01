const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./blog_test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
// const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
describe('GET: when there are initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have \'id\' defined as identifier', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog =>
      expect(blog.id).toBeDefined())
  })
})

describe('POST: addition of new blog(s)', () => {
  test('succeeds with valid data', async() => {
    const newBlog = {
      author: 'ttheland',
      title: 'testing POST method using async/await with jest',
      url: 'url go brrr',
      likes: 9001
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(newBlog.title)
  })

  test('a blog\'s likes are set to 0 if missing', async () => {
    const noLikesBlog = {
      title: 'enforcing data integrity in your POST method',
      author: 'ttheland',
      url: 'url go brrr'
    }

    const response = await api
      .post('/api/blogs')
      .send(noLikesBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toBe(0)
  })

  test('returns \'400: Bad Request\' if title missing from post', async () => {
    const noTitleBlog = {
      author: 'ttheland',
      url: 'url go brrr',
      likes: 400
    }

    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)
  })

  test('returns \'400: Bad Request\' if url missing from post', async () => {
    const noUrlBlog = {
      title: 'the url is set to \'required\' in models/blog',
      author: 'ttheland',
      likes: 400
    }

    await api
      .post('/api/blogs')
      .send(noUrlBlog)
      .expect(400)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
