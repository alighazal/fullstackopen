import { useDispatch } from "react-redux"
import { createAnecdotes } from "../reducers/anecdoteReducer"
import anecdoteService from '../services/anecdotes'


const AnecdotesForm =  ()  => {

    const dispatch = useDispatch()

    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch( createAnecdotes(content) )
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