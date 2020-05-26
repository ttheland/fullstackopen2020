import React from 'react'

const Header = (props) =>
  <h1>{props.course}</h1>

const Content = (props) => (
  <li>
    {props.parts.map((part) =>
      <Part key={part.id} part={part} />
    )}
  </li>
)

const Part = (props) => (
  <li>
    <p> {props.part.name} | {props.part.exercises} </p>
  </li>
)

const Total = (props) => {
  const totalExercises =
    props.parts.reduce((s, p) => s + p.exercises, 0)
    return (
      <b>
        Total exercises: {totalExercises}
      </b>
    )
}

const Course = ({course}) => {
  return (
    <ul>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </ul>
  )
}

export default Course
