import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('BlogForm component...', () => {
  test('updates parent state and calls onSubmit', () => {
    const addBlog = jest.fn()

    const component = render(<BlogForm createBlog={addBlog} />)

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const inputForm = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
      target: { value: 'Test Blog Title' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'ttheland' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'http://urlgobrrr.rr' }
    })
    fireEvent.submit(inputForm)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('Test Blog Title')
    expect(addBlog.mock.calls[0][0].author).toBe('ttheland')
    expect(addBlog.mock.calls[0][0].url).toBe('http://urlgobrrr.rr')
  })
})
