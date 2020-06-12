import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogService'
import loginService from './services/loginService'

const App = () => {
  const [message, setMessage] = useState({ content: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const showNotification = (content, color = '#0f400a') => {
    setMessage({ content, color })
    setTimeout(() => {
      setMessage({ content: null })
    }, 5000)
  }

  // effect hook to remember user login
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('login in localStorage:', user.username)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      // store login in browser session
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      showNotification(`${user.username} logged in`)
      setUser(user)
      console.log('user login:', user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('wrong credentials', 'red')
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    showNotification(`${user.username} logged out`)

    setUser(null)
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
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
      <Notification message={message} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          logged in as <b>{user.username}</b>{' '}
          <button onClick={handleLogout}>logout</button>
          <BlogList user={user} showNotification={showNotification} />
        </div>
      )}
      <Footer />
    </div>
  )
}

export default App
