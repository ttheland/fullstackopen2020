import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/course'
import './index.css'

const CourseList = ({courses}) => (
  <ul className="courselist">
    {courses.map((course) =>
      <Course key={course.id} course={course} />
    )}
  </ul>
)

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 0,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 0
        },
        {
          name: 'Using (props) to pass data',
          exercises: 7,
          id:1
        },
        {
          name: 'State of a component',
          exercises: 14,
          id:2
        }
      ]
    },
    {
      name: 'JavaScript',
      id: 1,
      parts: [
        {
          name: 'Function definitions',
          exercises: 5,
          id: 0
        },
        {
          name: 'Functional programming in JS',
          exercises: 3,
          id: 1
        }
      ]
    }
  ]

  return (
    <div>
      <CourseList courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
