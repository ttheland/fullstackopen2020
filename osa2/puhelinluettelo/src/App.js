import React, { useState, useEffect } from 'react'
import Person from './components/person'
import Filter from './components/filter'
import PersonForm from './components/personForm'

import personService from './services/persons'
// TODO: deal w/ handleDelete
// TODO: sync adds to server
const PersonList = ({ filter, persons, filteredPersons, handleDelete }) => (
  <div className="persons">
  {filter === ""
  // using optional chaining (?.)
    ? persons?.map(person => (
        <Person
          key={person.name}
          person={person}
          handleDelete={handleDelete}
        />
      ))
    : filteredPersons?.map(person => (
        <Person
          key={person.name}
          person={person}
          handleDelete={handleDelete}
        />
      ))}
</div>

)

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState(persons)

  useEffect(() => {
    personService
     .getAll()
     .then((initialPersons) => {
       console.log('getall');
       setPersons(initialPersons)
     })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }
    // array method .some returns true if name match found
    const alreadyExists = persons.some((person) => person.name === newName)

    if (!alreadyExists) {
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
      return

    }
    window.alert(`${newName} is already in the phonebook.`)
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filtered = persons.filter((person) =>
      // Check if name is in the phonebook
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )

    setFilteredPersons(filtered);
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleSearchInput={filter}
        handleFilterChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
       <PersonList
         filter={filter}
         persons={persons}
         filteredPersons={filteredPersons}
       />

    </div>
  )

}

export default App
