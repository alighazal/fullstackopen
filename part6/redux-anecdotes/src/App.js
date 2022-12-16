import { useSelector, useDispatch } from 'react-redux'
import { addNewAnecdoteAction, increasVoteCountAction } from './reducers/anecdoteReducer'


const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()


  const increasVoteCount = (id) => {
    console.log('vote', id)
    dispatch( increasVoteCountAction(id) )
  }
  
  const addNewAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch( addNewAnecdoteAction(content) )
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => increasVoteCount(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div> <input name="anecdote" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App