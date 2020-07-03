import anecdoteService from '../services/anecdoteService'

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: { anecdotes },
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_ANECDOTES':
    return state
      .concat(action.data.anecdotes)
      .sort((a1, a2) => a2.votes - a1.votes) // sort by likes (desc.)
  case 'ADD_ANECDOTE':
    return state.concat(action.data.anecdote)
  case 'UPDATE':
    const updatedAnecdote = action.data.anecdote
    return state
      .map((a) => (a.id !== updatedAnecdote.id ? a : updatedAnecdote))
      .sort((a1, a2) => a2.votes - a1.votes)
  default:
    return state
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create({ content, votes: 0 })
    dispatch({
      type: 'ADD_ANECDOTE',
      data: { anecdote },
    })
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const oldAnecdote = await anecdoteService.getSingle(id)
    const updatedAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 }
    await anecdoteService.update(updatedAnecdote)

    dispatch({
      type: 'UPDATE',
      data: { anecdote: updatedAnecdote },
    })
  }
}

export default anecdoteReducer
