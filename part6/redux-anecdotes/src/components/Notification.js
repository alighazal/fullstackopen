import { connect } from 'react-redux' 


const Notification = (props) => {
  // const notification = useSelector(state => state.notification)

  console.log(props)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    props.notification.message.length !== 0?
    <div style={style}>
      {props.notification.message}
    </div>: null
  )

}

const mapStateToProps = state =>( { notification: state.notification })

export default connect(
  mapStateToProps,
  null
)(Notification)
