import React, { useState, useEffect } from 'react'
import blogService from '../services/blogService'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = ({ user, showNotification }) => {
  const [blogs, setBlogs] = useState([])

  const blogFormRef = React.createRef()

  const blogsSortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

  // effect hook to fetch blogs
  useEffect(() => {
    console.log('blog fetch useEffect')
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
      .catch(error => {
        console.log('blog fetch failed:', error.message)
      })
  }, [])

  const createBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
  }

  const addLike = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)

      const updatedBlog = {
        ...blogObject,
        id
      }
      setBlogs(blogs.map(blog => (blog.id !== id ? blog : updatedBlog)))
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteBlog = async blog => {
    if (window.confirm(`Delete listing '${blog.title}'?`)) {
      await blogService.remove(blog.id)
      setBlogs(await blogService.getAll())
      showNotification(`Blog '${blog.title}' removed`)
    }
  }

  if (user) {
    return (
      <div>
        <Togglable ref={blogFormRef} buttonlabel="new blog">
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <h2>Blogs</h2>
        {blogsSortedByLikes.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            removeBlog={handleDeleteBlog}
            addLike={addLike}
          />
        ))}
      </div>
    )
  }
}

export default BlogList
