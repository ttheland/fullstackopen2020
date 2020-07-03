const notificationReducer = (state = { text: '', timer: null }, action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    // 6.21  ↓
    if (state.timer !== null) {
      clearTimeout(state.timer)
    }
    return { text: action.data.text, timer: action.data.timer }
  case 'CLEAR_MESSAGE':
    return { text: '', timer: null }
  default:
    return state
  }
}

// asynchronous action creator for notifications with params (text, time(secs))
export const setNotification = (text, time) => {
  return async (dispatch) => {
    const timer = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000) // to ms
    dispatch({
      type: 'SET_MESSAGE',
      data: { text, timer },
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE',
      })
    }, time * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_MESSAGE',
  }
}

export default notificationReducer
