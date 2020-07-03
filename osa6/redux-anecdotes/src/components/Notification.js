import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    colour: 'green',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return (
    <div>
      {props.notification === '' ? null : (
        <div style={style}>{props.notification}</div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { notification: state.notification.text }
}

export default connect(mapStateToProps, null)(Notification)
