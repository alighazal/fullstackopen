import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AnecdotesForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { setAnecdotesAction } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdote => dispatch(setAnecdotesAction(anecdote))) }, [dispatch] ) 
  
    const anecdotes = useSelector((state) => (state.anecdote.filter(anecdote => (anecdote.content.includes(state.filter.format)) )))


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList anecdotes={ anecdotes.slice().sort( (a,b ) => ( b.votes - a.votes )) } />
      <h2>create new</h2>
      <AnecdotesForm />
    </div>
  )
}

export default App