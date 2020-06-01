const listHelper = require('../utils/list_helper')

const listWithSeveralBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

// 4.4 tests
describe('total likes', () => {
  test('of empty list is zero', () => {
    const emptyBlogsList = []

    const result = listHelper.totalLikes(emptyBlogsList)
    expect(result).toBe(0)

  })

  test('(when list has only one blog) equals the likes of the blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated correctly', () => {

    const result = listHelper.totalLikes(listWithSeveralBlogs)
    expect(result).toBe(36)
  })
})

// 4.5* tests
describe('the blog with most likes', () => {

  const blogWithMostLikes = listWithOneBlog[0]
  const blogs = []

  test('of an empty list is \'undefined\'', () => {
    const result = listHelper.favBlogObjectReturn(blogs)
    expect(result).toBe(undefined)
  })

  test('in a list with one blog is that one blog', () => {
    // console.log('blogWithMostLikes:', blogWithMostLikes)
    // console.log('list: ', listWithOneBlog)
    const result = listHelper.favBlogObjectReturn(listWithOneBlog)
    expect(result).toEqual(blogWithMostLikes)
  })
})

describe('author with most blogs', () => {

  test('in an empty list is \'undefined\'', () => {
    expect(listHelper.mostBlogs([])).toBe(undefined)
  })

  test('in a list with one blog is the author of that blog and returned in proper fashion', () => {
    const singleBlog = {
      author: 'Michael Chan',
      blogs: 1
    }

    expect(listHelper.mostBlogs([listWithSeveralBlogs[0]])).toEqual(singleBlog)
  })

  test('in a list with several blogs is correct ad returned in proper fashion', () => {

    const authorWMostBlogs = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    expect(listHelper.mostBlogs(listWithSeveralBlogs)).toEqual(authorWMostBlogs)
  })
})

describe('author with most likes', () => {

  test('in an empty list is \'undefined\'', () => {
    expect(listHelper.mostLikes([])).toBe(undefined)
  })

  test('in a list with one blog is the author of that blog and returned in proper fashion', () => {
    const singleBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }

    expect(listHelper.mostLikes([listWithSeveralBlogs[1]])).toEqual(singleBlog)
  })

  test('in a list with several blogs is correct and returned in proper fashion', () => {
    const authorWMostLikes = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    expect(listHelper.mostLikes(listWithSeveralBlogs)).toEqual(authorWMostLikes)
  })
})
