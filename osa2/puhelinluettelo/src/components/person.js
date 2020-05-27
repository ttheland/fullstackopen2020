import React from 'react'

const Person = ({ person, handleDelete }) => (
    <li>{person.name} | {person.number} | <button className="delete" onClick={() => handleDelete(person)}>delete</button>
    </li>
  )

export default Person
