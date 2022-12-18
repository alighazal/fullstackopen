import { createAnecdotes } from "../reducers/anecdoteReducer"
import { connect } from 'react-redux' 
import { setNotification } from "../reducers/notificationReducer"


const AnecdotesForm =  (props)  => {

    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.createAnecdotes(content) 
        props.setNotification( ` New Anecdote: "${content}"`, 5 )
        event.target.anecdote.value = ''
    }

    return (
        <form onSubmit={addNewAnecdote}>
            <div> <input name="anecdote" /></div>
            <button type='submit'>create</button>
        </form>
    )
}

const mapDispatchToProps = {
    createAnecdotes,
    setNotification
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdotesForm) 
