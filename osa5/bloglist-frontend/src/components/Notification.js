import React from 'react'

const Notification = ({ message }) => {
  const style = {
      color: message.color,
      background: '#e3ddcc',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
      width: '40%'
  }

  if (message.content == null) {
    return null
  }
  return (
    <div style={style}>
      {message.content}
    </div>
  )
}

export default Notification
