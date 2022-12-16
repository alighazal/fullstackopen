import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    notification.message.length !== 0?
    <div style={style}>
      {notification.message}
    </div>: null
  )
}

export default Notification