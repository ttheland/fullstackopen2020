import React from 'react'

const Filter = ({filter, handleFilterChange}) => (
    <div>
      <form>
        filter shown with: <input value={filter} onChange={handleFilterChange} />
      </form>
    </div>
  )

export default Filter
