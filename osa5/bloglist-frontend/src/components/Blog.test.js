import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  const testTitle = 'C\'est ne pas une test'

  const blog = {
    title: testTitle,
    author: 'ttheland',
    likes: 10000,
    url: 'http.testing.com',
    user: {
      name: 'Tomas Helander',
      username: 'ttheland'
    }
  }
  test('renders title and author initially', () => {
    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)

    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('url and likes rendered when isFullView', () => {
    const component = render(<Blog blog={blog} />)

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('like button test', async () => {
    const mockHandler = jest.fn()

    const component = render(<Blog blog={blog} addLike={mockHandler} />)
    fireEvent.click(component.getByText('view'))

    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
