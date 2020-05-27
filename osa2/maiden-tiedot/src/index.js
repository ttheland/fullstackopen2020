import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import axios from 'axios'

axios
  .get('https://restcountries.eu/rest/v2/all')
  .then((response) => {
    ReactDOM.render(
    <App countries={response.data} />,
    document.getElementById('root'),
  )
})
