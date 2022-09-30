
const Header = ({name}) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  );

}

const Part = ({partName, excersiesCount}) => {
  return (
      <p>
        {partName} {excersiesCount}
      </p>
  );
}


const Content = ( {part1, part2, part3, exercises1, exercises2, exercises3} ) => {
  return (
    <>
      <Part partName={part1} excersiesCount={exercises1} />
      <Part partName={part2} excersiesCount={exercises2} />
      <Part partName={part3} excersiesCount={exercises3} />
    </>
  );

}


const Total = ({exercises1 ,exercises2, exercises3}) => {
  return (
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  );

}



 

const App = () => {
  const course = 'Half Stack application development'

  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  return (
    <div>
      <Header name = {course} />
      <Content  part1={part1} part2={part2} part3={part3}
                exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}  />

      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App;
