import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0))
  const copy = [...points]

  const handleRandomClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
    console.log('showing anecdote', selected)
  }

  const handleVoteClick = () => {
    copy[selected] += 1
    setPoints(copy)
    console.log('current standing',points)
  }

  const topAnecdoteVotes = Math.max(...points)
  const topAnecdote = points.indexOf(topAnecdoteVotes)

  return (
    <>
      <h1>anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes </div>

      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleRandomClick} text="next anecdote"/>

      <h2>Anecdote with most votes</h2>
      <div>{props.anecdotes[topAnecdote]}</div>
      <div>has {topAnecdoteVotes} votes</div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
