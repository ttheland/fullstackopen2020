import React, { useState, useEffect } from 'react'
import Person from './components/person'
import Filter from './components/filter'
import PersonForm from './components/personForm'

import PersonDB from './services/persons'

const PersonList = ({ filter, persons, filteredPersons, handleDelete }) => (
  <div className="personList">
    {(filter === '')
      ? persons.map(person => (
          <Person
            key={person.name}
            person={person}
            handleDelete={handleDelete}
          />
        ))
      : filteredPersons.map(person => (
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
    PersonDB
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
      // adding to db:
      PersonDB
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          // reset inputs
          setNewName('')
          setNewNumber('')
        })

    } else {
      const confirmUpdate = window.confirm(`${newName} is already in the phonebook. Update number?`)
      if (confirmUpdate) {
        handleUpdate(newName)
      }
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const filtered = persons.filter((person) =>
      // Check if name is in the phonebook
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )

    setFilteredPersons(filtered)
  }

  const handleDelete = (deletedPerson) => {
    const confirmDelete = window.confirm(`Delete entry for ${deletedPerson.name}?`)
    if (confirmDelete) {
      PersonDB
        .remove(deletedPerson.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
    }
  }

  const handleUpdate = (name) => {
    const oldPerson = persons.find(p => p.name === name)
    const updatedPerson = {...oldPerson, number: newNumber}

    PersonDB
      .update(updatedPerson.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(
          persons.map(
            person =>
             person.id !== oldPerson.id ? person: returnedPerson
          )
        )
      })
    setNewName('')
    setNewNumber('')
  }


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
         handleDelete={handleDelete}
       />

    </div>
  )
}

export default App
