import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td> 
    </tr>
  );
}

const Statistics = ({good, bad, neutral}) => {

    const calculateAvg = (good, bad, neutral) => {
      return ( ((good * 1) + (bad*-1) + (neutral * 0)) / (good + bad + neutral ) );
    }

    const calculatePositivePercentage = (good, bad, neutral) => {
      return good / ( good + bad + neutral );

    }

    let statistics = [
      { "text": "good", "value": good  },
      { "text": "neutral", "value": neutral  },
      { "text": "bad", "value": bad  },
      { "text": "all", "value": good+bad+neutral  },
      { "text": "average", "value": calculateAvg(good,neutral,bad)  },
      { "text": "positive", "value": calculatePositivePercentage(good, neutral, bad)  }
    ];


  return ( <div>
      <h1> <b> statistics </b> </h1>

      { 
      ( good + bad + neutral === 0 ) ? 
        <p> No Feedback Given </p> :
        <div>
          <table>
            <tbody>
              {
                statistics.map( 
                  ( {text, value}) => <StatisticLine key = {text} text={text} value={value} />
                )
              }
                  
            </tbody>
          </table>
        </div>
      }

     
  </div>  );
  
}

const Button = ({ text , action }) => {
  return (
    <button onClick={ action } > {text} </button>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 
  return (
    <div>
      <h1> <b> give feedback </b> </h1>

      <div>
        <Button text = "good" action = {()=> setGood( good + 1 )}  />
        <Button text = "netural" action = {()=> setNeutral( neutral + 1 )}  />
        <Button text = "bad" action = {()=> setBad( bad + 1 )}  />
      </div>

     <Statistics  good={good} bad={bad} neutral={neutral}  />

    </div>
  )
}

export default App