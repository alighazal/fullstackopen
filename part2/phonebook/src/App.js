import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Contacts = ({content, persons, setPersons}) => {

  return (
    <>
        {content.map( (person) =>
            <div key={person.number} > {person.name} -- {person.number} 
              <button onClick={
               () => {
                //confirm
                if (window.confirm( `delete ${person.name}` )) {
                  // send request
                  personService.deleteObject(person.id).then(
                    console.log( `deleted user with id : ${person.id}` )
                  )
                }
                // update application state
                let newState = persons.filter( person_ => person_.id !== person.id )
                setPersons(newState)
               } 
              } > delete </button>            
            </div> )}
    </>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filterString, setFilterString] = useState("")


  
  useEffect(() => {

    personService.getAll().then(
      response => {
        setPersons(response)
      }
    )
  }, [])

  const content = persons.filter( (person) => 
                                        person.name.toLowerCase().search( filterString ) !== -1 )

  const addPerson = (event) => {

    event.preventDefault()

    let alreadyExists = false;
    for (let i = 0; i < persons.length; i++ ){
      if ( persons[i].name === newPerson.name ){

        if (window.confirm( `${newPerson.name} is already added to phonebook, 
                              replace the old number with a new one ` )) {
          personService.update(persons[i].id, newPerson  ).then(
            console.log( ` user with id : ${persons[i].id} have been updated` )
          )
          let updatedPersonsState = persons.map(  person => 
                                          ( person.name !== newPerson.name )? person:
                                                                              newPerson ) 
          setPersons(updatedPersonsState)
        }
        alreadyExists = true;
      }
    }
    if ( !alreadyExists ){
      setPersons(persons.concat(newPerson))
      personService.create( newPerson ).then(
        response => 
          console.log(response)
      )
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
      <Contacts persons = {persons} setPersons={setPersons} content={content} />
      
    </div>
  )
}

export default App