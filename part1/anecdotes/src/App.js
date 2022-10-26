import { useState } from 'react'

const Anecdote =  ({selected, anecdotes, votes}) => {
  return (
    <>
      <div> {anecdotes[selected]} </div> 
      <div> Has { votes[ selected ] } votes </div>
    </>
  );
}

const AnecdoteWithMostVotes = ({votes, anecdotes}) => {

  const getMostVotedAnecdote = (votes, anecdotes) => {
    let indexMaxVotedAnecdote = votes.indexOf( Math.max( ...votes ) );
    return <Anecdote  selected = {indexMaxVotedAnecdote} votes={votes} anecdotes = {anecdotes} />
  }

  return (
    <>
      <h1><b>Anecdote with most votes</b></h1>
      <div>
        { getMostVotedAnecdote(votes, anecdotes) }
      </div>
    </>
  );
}


const AnecdoteOfTheDay = ({selected, setSelected, anecdotes, votes, setVotes}) => {

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

  return (
    <>
      <h1><b>Anecdote of the day</b></h1>
      <Anecdote  selected = {selected} votes={votes} anecdotes = {anecdotes} />

      <div>
      <button onClick={ () => {
        let randomNumber =  getRandomIntInclusive(0, anecdotes.length -1 )
        setSelected( randomNumber )
      }  } > next anecdote </button>

      <button onClick={ () => {
        let copy = [...votes];
        copy[selected] ++;
        setVotes( copy )
      }  } > vote </button>
      </div>
    </>

  );

}

const App = () => {


  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [ selected, setSelected] = useState(0)
  const [ votes, setVotes ] = useState( Array(anecdotes.length).fill(0) )

  return (
    <div>
      <AnecdoteOfTheDay 
        selected = {selected} 
        setSelected = {setSelected} 
        votes ={votes} 
        setVotes = {setVotes} 
        anecdotes={anecdotes}  
      />

      <AnecdoteWithMostVotes 
        votes ={votes} 
        anecdotes={anecdotes} 
      />
    </div>
  )
}

export default App;
