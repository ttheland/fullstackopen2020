import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ content: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  const showNotification =  (content, color='#0f400a') => {
  setMessage({content, color})
  setTimeout(() => {
    setMessage({content: null})
  }, 5000)
}

  // effect hook to fetch blogs
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => {

       setBlogs( blogs )
      })
      .catch((error) => {
        showNotification('blog fetch failed', 'red')
        console.log(error.response.data)
      })
  }, [])

  // effect hook to remember user login
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      // store login in browser session
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      showNotification(`${user.username} logged in`)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('wrong credentials', 'red')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    showNotification(`${user.username} logged out`)

    setUser(null)
  }

  const handleSubmit = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const loginForm = () => (
    // <Togglable buttonlabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    // </Togglable>
  )

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new listing" ref={blogFormRef}>
      <BlogForm createBlog={handleSubmit} />
    </Togglable>
  )

  if (user === null) {
   return (
     <div>
       <h2>Log in to application</h2>
         <Notification message={message} />
       {loginForm()}
     </div>
   )
 }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />

      {user === null ?
      loginForm() :
      <div>
        logged in as <b>{user.name}</b> <button onClick={handleLogout}>logout</button>

        {blogForm()}

        <ul>{blogList()}</ul>
      </div>
      }
      <Footer />
    </div>
  )
}

export default App
