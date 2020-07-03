import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(setFilter(filter))
  }

  return (
    <div>
      filter: <input name="filter" onChange={handleChange} />
    </div>
  )
}

export default Filter
