import { useSelector } from 'react-redux'
import AnecdotesForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'


const App = () => {
  const anecdotes = useSelector((state) => state.anecdote)
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList anecdotes={ anecdotes.slice().sort( (a,b ) => ( b.votes - a.votes )) } />
      <h2>create new</h2>
      <AnecdotesForm />
    </div>
  )
}

export default App