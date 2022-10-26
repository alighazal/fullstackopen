import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const calculateAvg = (good, bad, neutral) => {
    return ( ((good * 1) + (bad*-1) + (neutral * 0)) / (good + bad + neutral ) );
  }

  const calculatePositivePercentage = (good, bad, neutral) => {
    return good / ( good + bad + neutral );

  }

  return (
    <div>
      <h1> <b> give feedback </b> </h1>

      <div>
        <button onClick={()=> setGood( good + 1 ) } > good </button>
        <button onClick={()=> setNeutral( neutral + 1 ) } > neutral </button>
        <button onClick={()=> setBad( bad + 1 ) }> bad </button>
      </div>

      <h1> <b> statistics </b> </h1>
      
      <div> good { good } </div>
      <div> neutral { neutral } </div>
      <div> bad { bad } </div>

      
      <div> all { good + bad + neutral } </div>
      <div> average { calculateAvg(good, bad, neutral) } </div>
      <div> positive { calculatePositivePercentage(good, bad, neutral) } % </div>


    </div>
  )
}

export default App