import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({name, val, setVal, all, setAll}) => {
  const setToVal = () => {
    setVal(val+1)
    setAll(all+1)
  }

  return (
    <button onClick={setToVal}>
      {name}
    </button>
  )
}

const Statistic = ({text,val,post}) => (
  <tr>
    <td>{text}</td>
    <td>{val}{post}</td>
  </tr>
)
const Statistics = ({good,bad,neutral,all}) => {
  if(all === 0) {
    return (
      <div>
          no feedback yet.
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text="good:" val={good} />
        <Statistic text="neutral:" val={neutral} />
        <Statistic text="bad:" val={bad} />
        <Statistic text="all:" val={all} />
        <Statistic text="average:" val={ +((good - bad) / all).toFixed(2)} />
        <Statistic text="positive:" val={ +((good / all ) * 100).toFixed(2)} post="%" />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" val={good} setVal={setGood} all={all} setAll={setAll} />
      <Button name="neutral" val={neutral} setVal={setNeutral} all={all} setAll={setAll} />
      <Button name="bad" val={bad} setVal={setBad} all={all} setAll={setAll} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
