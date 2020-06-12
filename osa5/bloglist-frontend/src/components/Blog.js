import React, { useState } from 'react'

const Blog = ({ user, blog, addLike, removeBlog }) => {
  const [isFullView, setIsFullView] = useState(false)

  const blogStyle = {
    paddingTop: 1,
    paddingLeft: 2,
    border: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
    width: '60%'
  }

  const updateLikes = () => {
    const { id, author, url, title } = blog
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      title,
      author,
      url
    }
    addLike(id, updatedBlog)
  }

  // show delete button if uploader is logged in
  const showDeleteForOwner = () => {
    if (user) {
      if (isFullView && blog.user.username === user.username) {
        return (
          <div>
            <button
              id="remove-button"
              type="button"
              onClick={() => removeBlog(blog)}
            >
              Delete
            </button>
          </div>
        )
      }
    }
    return null
  }

  const fullViewData = (
    <div className="fullBlogView">
      <span className="url">{blog.url}</span> |
      <span className="username">posted by: {blog.user.username}</span>
      <span className="likes">
        <b> {blog.likes} likes</b>{' '}
        <button id="like-button" onClick={updateLikes}>
          like
        </button>
      </span>
    </div>
  )

  return (
    <li className="blog" style={blogStyle}>
      &quot;{blog.title}&quot; by <b>{blog.author}</b>
      {isFullView ? fullViewData : null}
      <button id="view-button" onClick={() => setIsFullView(!isFullView)}>
        {isFullView ? 'hide' : 'view'}
      </button>
      {showDeleteForOwner()}
    </li>
  )
}

export default Blog
