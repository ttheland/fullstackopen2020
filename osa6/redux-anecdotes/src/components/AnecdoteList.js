import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    const filtered = state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    )
    return filtered
  })

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`gave a vote to '${anecdote.content}' !`, 5))
  }

  const liStyle = {
    marginBottom: 10,
  }

  return (
    <ol>
      {anecdotes.map((anecdote) => (
        <li style={liStyle} key={anecdote.id}>
          <b>
            <em>&lsquo;{anecdote.content}&rsquo;</em>
          </b>
          <div>
            {anecdote.votes} votes{' '}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default AnecdoteList
