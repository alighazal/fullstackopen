
import { createNewFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux' 



const Filter = (props) => {

    const handleChange = (event) => {
        props.createNewFilter( event.target.value ) 
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapDispatchToProps = {
    createNewFilter,
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(Filter) 