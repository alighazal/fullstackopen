import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('Blog', () => {
  let blog = {
    likes: 134,
    author: 'author name ',
    title:' test title',
    url: 'www.test.com'
  }
  test('renders title and author & doesn\'t render likes and url', () => {


    render(<Blog blog={blog} />)

    const author_displayed = screen.queryByText('author name')
    const title_displayed = screen.queryByText('test title')
    const url_displayed = screen.queryByText('www.test.com')
    const likes_displayed = screen.queryByText('134')

    expect(author_displayed).toBeDefined()
    expect(title_displayed).toBeDefined()
    expect(url_displayed).toBeNull()
    expect(likes_displayed).toBeNull()
  })


  test('after clicking the button, children are displayed', () => {

    render(<Blog blog={blog} />)

    const button = screen.getByText('show')
    userEvent.click(button)

    const url_displayed = screen.queryByText('www.test.com')
    const likes_displayed = screen.queryByText('134')
    const hide_button_displayed = screen.queryByText('hide')

    expect(url_displayed).toBeDefined()
    expect(likes_displayed).toBeDefined()
    expect(hide_button_displayed).toBeDefined()
  })



})
