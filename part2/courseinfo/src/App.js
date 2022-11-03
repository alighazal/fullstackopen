const Course = ({course}) => {

    const getSumOfExercises =  (course) =>{
        
        let sum = 0;
        for (let i = 0; i < course.parts.length; i++) {
            sum += course.parts[i].exercises
        }

        return sum;
    }

    return (
        <>
            <h1>{course.name}</h1>
            { course.parts.map( part => <p> {part.name} {part.exercises} </p> ) }
            <p><b> total of {getSumOfExercises(course)}  exercises </b></p>
        </>
    )
}


const App = () => {
    const course = {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    }
  
    return <Course course={course} />
  }
  
  export default App