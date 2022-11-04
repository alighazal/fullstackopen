import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '0101010101' }
  ]) 
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })

  const addPerson = (event) => {

    event.preventDefault()

    let alreadyExists = false;
    for (let i = 0; i < persons.length; i++ ){
      if ( JSON.stringify(persons[i]) === JSON.stringify(newPerson) ){
        alert( `${newPerson.name} is already added to phonebook` )
        alreadyExists = true;
      }
    }
    if ( !alreadyExists ){
      setPersons(persons.concat(newPerson))
      setNewPerson({ name: '', number: '' })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form  onSubmit={addPerson}>
        <div>
          name: <input  
                      value={newPerson.name}
                      onChange={(event) => { setNewPerson({...newPerson,
                                                            name: event.target.value }) } }
                />
        </div>
        <div>number: <input
                          value={newPerson.number}
                          onChange={(event) => { setNewPerson({...newPerson,
                                                      number: event.target.value }) } } /></div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map( (person) => <div key={person.number} > {person.name} -- {person.number} </div> )
      }
    </div>
  )
}

export default App