import React, { useState } from 'react'


const Blog = ({ blog }) => {
  const [isFullView, setIsFullView] = useState(false)

  const blogStyle = {
    paddingTop: 1,
    paddingLeft: 2,
    border: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
    width: '50%'

  }

  const fullViewData = (
    <div>
      <span class='url'>{blog.url}</span> |
      <span class='username'>{blog.username}</span>
      <span class='likes'>{blog.likes} likes <button onClick={() => console.log('this will update likes')}>like</button></span>
    </div>
  )


  return (




  <li style={blogStyle}>
    "{blog.title}" by <b>{blog.author}  </b>
    {isFullView ? fullViewData : null}
    <button onClick={() => setIsFullView(!isFullView)}>{isFullView?'hide':'view'}
    </button>
  </li>
  )
}

export default Blog
