import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filterString, setFilterString}) => {

  return (
      <div>
          filter shown with <input  
                      value={filterString}
                      onChange={(event) => { setFilterString(event.target.value) } }
                />
      </div>

  )
}

const AddContact = ({addPerson, newPerson, setNewPerson}) => {
  return (
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

  )
}

const Contacts = ({content}) => {

  return (
    <>
        {content.map( (person) => <div key={person.number} > {person.name} -- {person.number} </div> )}
    </>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filterString, setFilterString] = useState("")


  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then( 
      response => {
        setPersons(response.data)
      }
     )
  }, [])

  const content = persons.filter( (person) => 
                                        person.name.toLowerCase().search( filterString ) !== -1 )

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
      axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        console.log(response)
      })
      setNewPerson({ name: '', number: '' })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filterString={filterString}  setFilterString={setFilterString} />

      <h2>add a new</h2>
      <AddContact addPerson={addPerson}  newPerson={newPerson} setNewPerson={setNewPerson} /> 
      
      <h2>Numbers</h2>
      <Contacts content={content} />
      
    </div>
  )
}

export default App