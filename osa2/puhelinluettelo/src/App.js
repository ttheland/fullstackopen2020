import React, { useState } from 'react'
import Person from './components/person'
import Filter from './components/filter'
import PersonForm from './components/personForm'

const App = () => {
  const [ persons, setPersons] = useState([{ name: 'A', number: '2222'},{ name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ filteredPersons, setFilteredPersons] = useState(persons)

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
    setFilter(event.target.value)

    setFilteredPersons(
      persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())),
    )
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
       {filteredPersons.map((person, i) =>
         <Person key={i} person={person} />
       )}
    </div>
  )

}

export default App
