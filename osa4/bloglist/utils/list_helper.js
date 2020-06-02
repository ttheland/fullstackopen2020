const logger = require('./logger')

// 4.4
const totalLikes = (blogs) => blogs.reduce((likes, blog) => (likes += blog.likes), 0)

// 4.5*
const favouriteBlogLikes = (blogs) => Math.max(...blogs.map(blog => blog.likes ))

const favBlogObjectReturn = (blogs) => blogs.find(blog => blog.likes === favouriteBlogLikes(blogs))

/* TODO: 4.6* define function mostBlogs, which takes array of blogs, and returns the author with the most blogs
e.g:
{
  author: "Robert C. Martin",
  blogs: 3
}
*/
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    logger.info('blog list empty')
    return
  }

  const blogCounts = {}
  blogs.forEach(blog => {
    (blogCounts[blog.author])
      ? blogCounts[blog.author].blogs += 1
      : blogCounts[blog.author] = {
        author: blog.author,
        blogs: 1
      }
  })

  const authors = Object.values(blogCounts)
  console.log('blogCounts:', blogCounts)
  return authorWithMost('blogs', authors)
}

/* TODO: 4.7* define function mostLikes, which takes array of blogs, returning author with most likes and the amount of likes.
e.g.:
{
  author: "Edsger W. Dijkstra",
  likes: 17
}
*/
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    logger.info('blog list empty')
    return
  }

  const likeCounts = {}
  blogs.forEach(blog => {
    (likeCounts[blog.author])
      ? likeCounts[blog.author].likes += blog.likes
      : likeCounts[blog.author] = {
        author: blog.author,
        likes: blog.likes
      }
  })
  const authors = Object.values(likeCounts)
  console.log('likeCounts:', likeCounts)
  return authorWithMost('likes', authors)
}

const authorWithMost = (field, authors) => {
  const firstAuthor = authors[0]
  return authors
    .slice(1)
    .reduce((currentAuthorWithMost, author) =>
      (author[field]) > currentAuthorWithMost[field]
        ? author
        : currentAuthorWithMost, firstAuthor)
}


module.exports = {
  totalLikes, favouriteBlogLikes, favBlogObjectReturn, mostBlogs, mostLikes
}
