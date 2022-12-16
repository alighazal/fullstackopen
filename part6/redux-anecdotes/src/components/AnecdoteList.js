

import { useDispatch } from 'react-redux'
import { increasVoteCountAction } from '../reducers/anecdoteReducer'
import { createNewNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({anecdotes}) => {
   
    const dispatch = useDispatch()

    const increasVoteCount = (id) => {
        console.log('vote', id)
        dispatch( increasVoteCountAction(id) )
        dispatch( createNewNotification( ` vote with id ${id} was up voted ` ) )
        setTimeout(() => {
            dispatch( hideNotification() )
          }, 5000)
    }
    return (
    anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => increasVoteCount(anecdote.id)}>vote</button>
            </div>
        </div>
        )
    )
}

export default AnecdoteList