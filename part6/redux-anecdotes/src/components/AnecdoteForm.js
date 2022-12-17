import { useDispatch } from "react-redux"
import { appendAnecdoteAction } from "../reducers/anecdoteReducer"
import anecdoteService from '../services/anecdotes'


const AnecdotesForm =  ()  => {

    const dispatch = useDispatch()

    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        const newAnecdote = await anecdoteService.createNew(content)
        console.log(newAnecdote)
        dispatch( appendAnecdoteAction(newAnecdote) )
        event.target.anecdote.value = ''
    }

    return (
        <form onSubmit={addNewAnecdote}>
            <div> <input name="anecdote" /></div>
            <button type='submit'>create</button>
        </form>
    )
}

export default AnecdotesForm