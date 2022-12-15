import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/react'

import BlogForm from '../components/BlogForm'

describe('BlogForm', () => {

  test('creating new blog, the function handler is called with the correct detail', async () => {

    let testBlog = {
      author: 'author name ',
      title:' test title',
      url: 'www.test.com'
    }
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render( <BlogForm addBlog={mockHandler} />)

    const input_title = screen.getByPlaceholderText('write here blog title')
    const input_author = screen.getByPlaceholderText('write here blog author')
    const input_URL = screen.getByPlaceholderText('write here blog URL')

    const sendButton = screen.getByText('save')

    await user.type(input_title, testBlog.title )
    await user.type(input_author, testBlog.author)
    await user.type(input_URL, testBlog.url )
    fireEvent.submit(sendButton)

    const form = screen.getByTestId('blog-form')
    expect(form).toHaveFormValues({
      title: testBlog.title,
      author: testBlog.author,
      URL: testBlog.url
    })

    expect(mockHandler.mock.calls).toHaveLength(1)
  })

})
