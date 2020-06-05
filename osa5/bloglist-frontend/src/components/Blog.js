import React from 'react'
const Blog = ({ blog }) => (
  <li>
    "{blog.title}" by <b>{blog.author}</b> | {blog.likes} likes
  </li>
)

export default Blog
