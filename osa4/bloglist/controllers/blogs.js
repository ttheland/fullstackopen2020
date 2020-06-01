const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const config = require('../utils/config')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token

  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)


  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      likes: body.likes === undefined ? 0 : body.likes,
      url: body.url,
      user: user._id
   }
 )

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== decodedToken.id.toString() ) {
    return response.status(401).json({ error: 'permission denied' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    author: body.author,
    title: body.title,
    likes: body.likes,
    url: body.url
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query'})
    .populate('user', { username: 1, name: 1 })

  if (updatedBlog) {
    response.json(updatedBlog.toJSON())
  } else {
    response.status(404).end()
  }

})


module.exports = blogsRouter
