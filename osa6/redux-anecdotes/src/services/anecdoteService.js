import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// helper function to avoid repeat await structure
// param operation: async function
const awaitResponse = async (operation) => {
  const response = await operation
  return response.data
}

const getSingle = async (id) => {
  return awaitResponse(axios.get(`${baseUrl}/${id}`))
}

const getAll = async () => {
  return awaitResponse(axios.get(baseUrl))
}

const create = async (anecdote) => {
  return awaitResponse(axios.post(baseUrl, anecdote))
}

const update = async (anecdote) => {
  return awaitResponse(axios.put(`${baseUrl}/${anecdote.id}`, anecdote))
}

const remove = async (id) => {
  return awaitResponse(axios.delete(`${baseUrl}/${id}`))
}

export default { getSingle, getAll, create, update, remove }
