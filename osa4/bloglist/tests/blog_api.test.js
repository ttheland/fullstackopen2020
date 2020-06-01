const supertest = require('supertest')
const mongoose = require('mongoose')
const blogHelper = require('./blog_test_helper')
const userHelper = require('./user_test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
//


beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  await Blog.insertMany(blogHelper.initialBlogs)
  await User.insertMany(userHelper.initialUsers)
})
describe('GET: when there are initially some blogs saved:', () => {

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

describe('POST: addition of new blog(s):', () => {
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
      .set('Authorization', `bearer ${await userHelper.getToken()}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogHelper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length + 1)

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
      .set('Authorization', `bearer ${await userHelper.getToken()}`)
      .expect(201)
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
      .set('Authorization', `bearer ${await userHelper.getToken()}`)
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
      .set('Authorization', `bearer ${await userHelper.getToken()}`)
      .expect(400)
  })

  test.only('returns \'401: Unauthorized\' if token missing', async () => {
    const newBlog = {
      title: 'unauthorized blog title',
      author: 'ttheland',
      url: 'url go brrr',
      likes: 401
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)


    const blogs = await blogHelper.blogsInDb()
    expect(blogHelper.initialBlogs).toHaveLength(blogs.length)
  })
})

describe('DELETE: deletion of blog(s):', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogHelper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogHelper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('PUT: updating blog list entries:', () => {
  test('can update likes on a blog with a valid request', async () => {
    const updatedBlog = await blogHelper.singleBloginDB()
    updatedBlog.likes += 1

    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)

  expect( await blogHelper.singleBloginDB()).toEqual(updatedBlog)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
