const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')

const initialUsers = [
  {
    name: 'Tomas Helander',
    username: 'ttheland',
    passwordHash: '$2a$10$rFwm87DiBkeoxFlkW.oKceFGxXNd4b241dWdRHTIvro9ztz5WJbR2'
  },
  {
    name: 'Raju-Erkka',
    username: 'razorblade89',
    passwordHash: '$2a$10$aijjVmZDtO.mcTV2B4arr.6BCzQMSK6qSGwuOfgv50PUM0WryaiJq'
  }
]
const singleUserInDb = async () => {
  return await User.findOne({ username: 'ttheland' })
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const getToken = async () => {
  const user = await singleUserInDb()
  return jwt.sign(
    {
      username: user.username,
      id: user.id
    },
    config.SECRET
  )
}

module.exports = {
  initialUsers, usersInDb, singleUserInDb, getToken
}
