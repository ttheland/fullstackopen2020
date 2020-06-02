const Blog = require('../models/blog')

const initialBlogs  = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5ebeaa342409723338b6e711',
    title: 'Blog aus mein Hertz ',
    author: 'Super-Hans',
    url: 'www.blogausmeinhertz.de',
    likes: 1000,
    __v: 0
  },
  {
    _id: '5ebeaa7e2409723338b6e712',
    title: 'The Best Page in The Universe',
    author: 'Maddox',
    url: 'http://maddox.xmission.com/',
    likes: 900000,
    __v: 0
  },
  {
    _id: '5ebeb224368e5f21e078e886',
    title: 'The Recluist',
    author: 'Mick',
    url: 'top secret',
    likes: 90,
    s__v: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'remove',
    author: 'remove',
    url: 'remove',
    likes: 0
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const singleBloginDb = async ()  => {
  const initialBlogs = await blogsInDb()
  return initialBlogs[0]
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, singleBloginDb, blogsInDb
}
