const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')

const initialUsers = [
  {
    name: 'Tomas Helander',
    username: 'ttheland',
    passwordHash: 'herp'
  },
  {
    name: 'Raju-Erkka',
    username: 'razorblade89',
    passwordHash: 'derp'
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
