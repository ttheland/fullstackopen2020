import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const authConfig = () => {
  return { headers: { Authorization: token } }
}


const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blog => {
  const response = await axios.post(baseUrl, blog, authConfig())
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, authConfig())
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, authConfig())
  return response.data
}

export default { getAll, create, update, remove, setToken }
