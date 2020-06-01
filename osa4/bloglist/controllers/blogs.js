// const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
// const User = require('../models/user')
const Blog = require('../models/blog')
// const config = require('../utils/config')
// require('express-async-errors')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})

  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  // const token = req.token
  //
  // const decodedToken = jwt.verify(token, config.SECRET)
  // if (!token || !decodedToken.id) {
  //   return res.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)


  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes === undefined ? 0 : body.likes,
    url: body.url,
    // user: user._id
  })

  const savedBlog = await blog.save()
  res.json(savedBlog.toJSON())

  // user.blogs = user.blogs.concat(savedBlog._id)
  // await user.save
  //
  // await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()
  // res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const token = req.token

  const decodedToken = jwt.verify(token, config.SECRET)
  if (!req || !decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(req.params.id)
  if (blog.user.toString() !== decodedToken.id.toString() ) {
    return res.status(401).json({ error: 'permission denied' })
  }

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    author: body.author,
    title: body.title,
    likes: body.likes,
    url: body.url
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(req.params.id, blog, { new: true, runValidators: true, context: 'query'})
    .populate('user', { username: 1, name: 1 })

  if (updatedBlog) {
    res.json(updatedBlog.toJSON())
  } else {
    res.status(404).end()
  }

})


module.exports = blogsRouter
