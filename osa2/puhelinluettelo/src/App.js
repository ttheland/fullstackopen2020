import React, { useState, useEffect } from 'react'
import './app.css'
import Person from './components/person'
import Filter from './components/filter'
import PersonForm from './components/personForm'

import PersonDB from './services/persons'

const Notification = ({ message, className }) => {
  if (message == null) {
    return null
  }
  return (
    <div className={className}>
      {message}
    </div>
  )
}


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
  const [ notificationMessage, setNotificationMessage ] =useState(null)

  useEffect(() => {
    PersonDB
     .getAll()
     .then((initialPersons) => {
       console.log('PersonDB.getall()');
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

          setNotificationMessage({
            notification: `added ${returnedPerson.name} to phonebook.`
          })
          resetNotification()

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
      // removing from db:
      PersonDB
        .remove(deletedPerson.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))

          setNotificationMessage({
            notification: `${deletedPerson.name} removed from phonebook.`
          })
          resetNotification()
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
        setNotificationMessage({
          notification: `${returnedPerson.name} number updated to ${returnedPerson.number}.`
        })
        resetNotification()

      })
      .catch(error => {
        setNotificationMessage({
          error: `${oldPerson.name} was already deleted from server`,
        })
        resetNotification()
        setPersons(persons.filter(p => p.id !== oldPerson.id))
      })

    setNewName('')
    setNewNumber('')
  }

  const resetNotification = () => {
    return (
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    )
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage?.notification || notificationMessage?.error}
        className={notificationMessage?.notification ? 'notification' : 'error'}
        resetNotification={resetNotification}
      />
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
